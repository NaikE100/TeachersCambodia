# Detailed Fix: ACME Challenge Error - Files Unreachable

## 🔴 Error You're Seeing

```
teacherscambodia.com was skipped due to unreachable 
http://teacherscambodia.com/.well-known/acme-challenge/letsencrypt_... file.

www.teacherscambodia.com was skipped due to unreachable 
http://www.teacherscambodia.com/.well-known/acme-challenge/letsencrypt_... file.

No domains pointing to this server to generate the certificate for.
```

## 🎯 Root Cause

Let's Encrypt cannot access your domain via HTTP to verify ownership. This happens when:
1. Domain is not accessible via HTTP
2. `.well-known/acme-challenge/` directory doesn't exist or is inaccessible
3. Domain not properly configured in DirectAdmin
4. Server configuration blocking access

## ✅ Step-by-Step Fix

### Step 1: Test HTTP Accessibility (CRITICAL FIRST STEP)

**Open a browser (or incognito mode) and test:**

1. Visit: `http://teacherscambodia.com` (use HTTP, not HTTPS)
2. Visit: `http://www.teacherscambodia.com` (use HTTP, not HTTPS)

**What you should see:**
- ✅ Website loads and displays content
- ✅ Even if it shows "Not secure" - that's OK for now

**If you get:**
- ❌ "This site can't be reached" → Domain not configured (go to Step 2)
- ❌ "Connection timed out" → DNS/server issue (go to Step 2)
- ❌ "404 Not Found" → Files missing (go to Step 3)
- ✅ Website loads → Continue to Step 4

### Step 2: Verify Domain is Added in DirectAdmin

**This is the MOST COMMON issue!**

1. **Log into DirectAdmin**: `https://sabretooth.hkdns.host:2222`

2. **Check Domain Setup**:
   - Go to "Domain Setup" or "Domain Management"
   - Look for `teacherscambodia.com` in the domain list
   - **If NOT listed**, you MUST add it:
     - Click "Add Domain" or "Create Domain"
     - Enter: `teacherscambodia.com`
     - Follow the setup wizard
     - This creates: `/domains/teacherscambodia.com/public_html/`

3. **Verify Directory Exists**:
   - Go to File Manager
   - Navigate to: `/domains/teacherscambodia.com/public_html/`
   - **If this directory doesn't exist**, the domain wasn't added correctly
   - Go back and add the domain properly

### Step 3: Verify Website Files Are Uploaded

**Check if your website files exist:**

1. **In DirectAdmin File Manager**:
   - Navigate to: `/domains/teacherscambodia.com/public_html/`
   - Verify `index.html` exists
   - Verify `assets/` folder exists (if applicable)

2. **If files are missing**:
   - Upload `index.html` to `/domains/teacherscambodia.com/public_html/`
   - Create and upload `assets/` folder if needed
   - Set permissions: Files (644), Folders (755)

3. **Test again**:
   - Visit: `http://teacherscambodia.com`
   - Should now load your website

### Step 4: Create ACME Challenge Directory

**This directory MUST exist and be accessible:**

1. **In DirectAdmin File Manager**:
   - Navigate to: `/domains/teacherscambodia.com/public_html/`

2. **Create Directory Structure**:
   - Create folder: `.well-known`
   - Inside `.well-known`, create folder: `acme-challenge`
   - **IMPORTANT**: Folder names are case-sensitive and must be exact:
     - `.well-known` (starts with a dot)
     - `acme-challenge` (lowercase, with hyphen)

3. **Set Permissions**:
   - `.well-known` folder: **755** (drwxr-xr-x)
   - `acme-challenge` folder: **755** (drwxr-xr-x)
   - **CRITICAL**: Both folders must be readable by web server

4. **Verify Structure**:
   ```
   /domains/teacherscambodia.com/public_html/
   ├── index.html
   ├── assets/ (if you have one)
   └── .well-known/
       └── acme-challenge/
   ```

### Step 5: Test ACME Challenge Directory Accessibility

**Verify Let's Encrypt can access the directory:**

1. **Create a test file**:
   - In File Manager, go to: `/domains/teacherscambodia.com/public_html/.well-known/acme-challenge/`
   - Create a new file: `test.txt`
   - Add content: `test`
   - Set permissions: **644**
   - Save

2. **Test in browser**:
   - Visit: `http://teacherscambodia.com/.well-known/acme-challenge/test.txt`
   - Should display: `test`
   - If you get 404, the directory isn't accessible

3. **If test file doesn't load**:
   - Check folder permissions (must be 755)
   - Check file permissions (must be 644)
   - Verify directory structure is correct
   - Check if `.well-known` folder name starts with dot

### Step 6: Verify DNS is Fully Propagated

**Even though DNS resolves, verify it's propagated globally:**

1. **Check DNS propagation**:
   - Visit: `https://www.whatsmydns.net`
   - Search: `teacherscambodia.com` (A record)
   - Search: `www.teacherscambodia.com` (A record)
   - Both should show: `144.76.98.182` worldwide

2. **If DNS not fully propagated**:
   - Wait 1-4 hours
   - DNS changes can take up to 24 hours
   - Don't try SSL until DNS is fully propagated

### Step 7: Retry SSL Certificate

**Once ALL above steps are complete:**

1. **Go to SSL Certificates**:
   - Navigate to: `sabretooth.hkdns.host:2222/evo/user/ssl/letsencrypt`
   - Make sure `teacherscambodia.com` is selected

2. **Request Certificate**:
   - Select: **"Get automatic certificate from ACME Provider"**
   - Common Name: `teacherscambodia.com`
   - Check BOTH boxes:
     - ☑ `teacherscambodia.com`
     - ☑ `www.teacherscambodia.com`
   - Click green **"SAVE"** button

3. **Wait for result**:
   - Should complete in 1-2 minutes
   - If successful, certificate appears in "Automated SSL Certificates" table
   - If error persists, check error message and go back to relevant step

## 🔍 Advanced Troubleshooting

### Issue: Domain accessible but ACME still fails

**Possible causes:**
1. **Firewall blocking Let's Encrypt**:
   - Contact Sabretooth support
   - Ask them to verify firewall allows Let's Encrypt IPs
   - Let's Encrypt IPs: `23.21.53.53`, `54.230.158.68`, etc.

2. **Server configuration issue**:
   - Contact Sabretooth support
   - Ask them to verify domain is properly configured
   - Ask them to check Apache/Nginx configuration

3. **.htaccess blocking access**:
   - Check for `.htaccess` file in `public_html/`
   - Temporarily rename it to `.htaccess.bak`
   - Retry SSL certificate
   - If it works, update `.htaccess` to allow `.well-known` access

### Issue: Directory exists but still unreachable

**Check these:**
1. Folder name must be exactly `.well-known` (with dot at start)
2. Permissions must be 755 (not 644)
3. Parent directory (`public_html`) must have 755 permissions
4. No `.htaccess` blocking access to `.well-known`

### Issue: Works for one domain but not the other

**If `teacherscambodia.com` works but `www.teacherscambodia.com` doesn't:**
1. Verify `www` A record exists in DNS
2. Verify `www` is configured in DirectAdmin
3. Create `.well-known/acme-challenge/` directory for www subdomain too
4. Or set up redirect from www to non-www

## 📋 Complete Checklist

- [ ] DNS resolves to `144.76.98.182` (confirmed ✅)
- [ ] `http://teacherscambodia.com` loads website
- [ ] `http://www.teacherscambodia.com` loads website
- [ ] Domain added in DirectAdmin Domain Setup
- [ ] Directory `/domains/teacherscambodia.com/public_html/` exists
- [ ] `index.html` file exists in `public_html/`
- [ ] `.well-known` folder exists (with dot at start)
- [ ] `acme-challenge` folder exists inside `.well-known`
- [ ] `.well-known` folder permissions: 755
- [ ] `acme-challenge` folder permissions: 755
- [ ] Test file accessible: `http://teacherscambodia.com/.well-known/acme-challenge/test.txt`
- [ ] DNS fully propagated worldwide
- [ ] Retried SSL certificate generation

## 🆘 Still Not Working?

**Contact Sabretooth Support with this information:**

1. **Domain**: `teacherscambodia.com`
2. **Server IP**: `144.76.98.182`
3. **Error**: "ACME challenge files unreachable"
4. **What you've verified**:
   - DNS is pointing correctly
   - Domain is added in DirectAdmin
   - `.well-known/acme-challenge/` directory exists with 755 permissions
   - HTTP is accessible
5. **Ask them to**:
   - Verify domain configuration
   - Check if firewall allows Let's Encrypt
   - Verify Apache/Nginx configuration
   - Check server logs for errors

---

**Most Common Issue**: Domain not added in DirectAdmin or HTTP not accessible. Verify Step 1 and Step 2 first! 🎯







