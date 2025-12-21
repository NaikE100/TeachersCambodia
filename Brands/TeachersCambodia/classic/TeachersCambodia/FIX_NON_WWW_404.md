# Fix: Non-WWW Domain Returns 404

## 🔴 Current Status

- ✅ `www.teacherscambodia.com` → Website loads (but shows "Not secure")
- ❌ `teacherscambodia.com` (non-www) → 404 Not Found

**Problem**: Let's Encrypt needs BOTH domains accessible to generate SSL certificate.

## 🎯 Why This Happens

The non-www domain (`teacherscambodia.com`) isn't properly configured in DirectAdmin. This is common when:
- Domain was added but non-www alias isn't set up
- Server configuration only handles www subdomain
- Domain needs to be configured to serve both www and non-www

## ✅ Solution: Configure Non-WWW Domain

### Option 1: Set Up Domain Alias (Recommended)

**In DirectAdmin:**

1. **Go to Domain Setup**:
   - Navigate to: `sabretooth.hkdns.host:2222`
   - Go to "Domain Setup" or "Domain Management"

2. **Check Domain Configuration**:
   - Find `teacherscambodia.com` in your domain list
   - Click on it to edit/view settings

3. **Add Domain Alias or Configure Non-WWW**:
   - Look for "Domain Aliases" or "Subdomain" settings
   - Add `teacherscambodia.com` as an alias pointing to the same directory
   - Or configure the domain to serve both www and non-www

4. **Alternative: Check if Domain Needs to be Added Separately**:
   - Some hosting setups require adding `teacherscambodia.com` separately
   - If you only see `www.teacherscambodia.com`, you may need to add the root domain

### Option 2: Set Up Redirect (Quick Fix)

**If you can't configure non-www to serve files, set up redirect:**

1. **In DirectAdmin**:
   - Go to "Domain Setup" → `teacherscambodia.com`
   - Look for "Redirects" or "URL Redirects"

2. **Create Redirect**:
   - Redirect `teacherscambodia.com` → `www.teacherscambodia.com`
   - Type: Permanent (301)
   - Save

3. **This will**:
   - Redirect all non-www traffic to www
   - Allow Let's Encrypt to verify both domains
   - Users accessing non-www will be redirected to www

### Option 3: Verify Domain Directory Structure

**Check if non-www domain has its own directory:**

1. **In DirectAdmin File Manager**:
   - Check if `/domains/teacherscambodia.com/public_html/` exists
   - If it exists but gives 404, check:
     - File permissions (should be 644 for files, 755 for folders)
     - `index.html` exists in the directory
     - Directory is set as document root

2. **If directory doesn't exist**:
   - Domain needs to be added in DirectAdmin
   - Or www subdomain is configured but root domain isn't

## 🔍 Quick Diagnostic Steps

### Step 1: Check What's Configured

**In DirectAdmin:**

1. Go to "Domain Setup" or "Domain Management"
2. List all domains/subdomains
3. Check if you see:
   - `teacherscambodia.com` (root domain)
   - `www.teacherscambodia.com` (subdomain)

**What you might see:**
- Only `www.teacherscambodia.com` listed → Need to add root domain
- Both listed → Check configuration
- Neither listed → Need to add domain

### Step 2: Test Directory Access

**In DirectAdmin File Manager:**

1. Navigate to: `/domains/teacherscambodia.com/public_html/`
2. Check if files exist:
   - `index.html` should be there
   - `assets/` folder should be there
3. If files exist but 404 occurs:
   - Check file permissions
   - Verify document root is set correctly

### Step 3: Contact Sabretooth Support

**If you can't resolve it:**

Contact Sabretooth support and ask:
- "I need `teacherscambodia.com` (non-www) to serve the same content as `www.teacherscambodia.com`"
- "Currently non-www gives 404, but www works"
- "I need this for SSL certificate generation"

They can:
- Configure domain aliases
- Set up server configuration
- Verify domain setup

## 🎯 Recommended Approach

**Best solution for SSL certificate:**

1. **Set up redirect** (Option 2 - Quickest):
   - Redirect `teacherscambodia.com` → `www.teacherscambodia.com`
   - This allows Let's Encrypt to verify both domains
   - Users will be redirected to www version

2. **Then generate SSL certificate**:
   - Both domains will be accessible (one via redirect)
   - Let's Encrypt can verify both
   - Certificate will cover both domains

3. **After SSL is working**:
   - You can configure non-www to serve files directly
   - Or keep redirect (common practice)

## 📋 Checklist

- [ ] Checked Domain Setup in DirectAdmin
- [ ] Verified if `teacherscambodia.com` is listed as domain
- [ ] Checked if non-www needs to be added separately
- [ ] Set up redirect from non-www to www (if needed)
- [ ] Tested `http://teacherscambodia.com` (should redirect or load)
- [ ] Verified both domains accessible
- [ ] Ready to retry SSL certificate generation

## 🆘 Still Getting 404?

**If non-www still gives 404 after trying above:**

1. **Contact Sabretooth Support**:
   - They can configure the domain properly
   - They can set up domain aliases
   - They can verify server configuration

2. **Alternative: Generate SSL for www only**:
   - Generate certificate for `www.teacherscambodia.com` only
   - Set up redirect from non-www to www
   - Users will always use www version with SSL

---

**Most Common Fix**: Set up redirect from non-www to www, then retry SSL certificate generation! 🎯







