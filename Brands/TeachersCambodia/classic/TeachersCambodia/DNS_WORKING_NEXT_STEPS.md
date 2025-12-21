# DNS Working - Next Steps for SSL Certificate

## ✅ DNS Status: CONFIRMED WORKING

Your DNS is correctly configured:
- `teacherscambodia.com` → `144.76.98.182` ✅
- `www.teacherscambodia.com` → `144.76.98.182` ✅

## 🎯 Next Steps (Do These Now)

### Step 1: Test HTTP Accessibility

**Open browser (or incognito mode) and test:**

1. Visit: `http://teacherscambodia.com` (use HTTP, not HTTPS)
2. Visit: `http://www.teacherscambodia.com` (use HTTP, not HTTPS)

**Expected Result:**
- ✅ Website loads (even if shows "Not secure")
- ✅ You can see your website content

**If you get:**
- ❌ "This site can't be reached" → Domain not configured in DirectAdmin
- ❌ "Connection timed out" → Server issue, contact Sabretooth support
- ❌ "404 Not Found" → Website files not uploaded
- ✅ Website loads → Continue to Step 2

### Step 2: Verify Domain in DirectAdmin

1. **Log into DirectAdmin**: `https://sabretooth.hkdns.host:2222`

2. **Check Domain Setup**:
   - Go to "Domain Setup" or "Domain Management"
   - Verify `teacherscambodia.com` is listed
   - If NOT listed, add it now:
     - Click "Add Domain" or "Create Domain"
     - Enter: `teacherscambodia.com`
     - Follow the setup wizard

3. **Check Website Files**:
   - Go to File Manager
   - Navigate to: `/domains/teacherscambodia.com/public_html/`
   - Verify files exist (at least `index.html`)
   - If files are missing, upload them (see Upload Guide)

### Step 3: Create ACME Challenge Directory

**This allows Let's Encrypt to verify your domain:**

1. **In DirectAdmin File Manager**:
   - Navigate to: `/domains/teacherscambodia.com/public_html/`

2. **Create Directory Structure**:
   - Create folder: `.well-known`
   - Inside `.well-known`, create folder: `acme-challenge`

3. **Set Permissions**:
   - `.well-known` folder: **755**
   - `acme-challenge` folder: **755**

**Final structure should be:**
```
/domains/teacherscambodia.com/public_html/
├── index.html (your website files)
└── .well-known/
    └── acme-challenge/
```

### Step 4: Retry SSL Certificate

**Once HTTP is accessible and directory is created:**

1. **Go to SSL Certificates**:
   - Navigate to: `sabretooth.hkdns.host:2222/evo/user/ssl/server`
   - Make sure `teacherscambodia.com` is selected

2. **Request Certificate**:
   - Select: **"Get automatic certificate from ACME Provider"**
   - Check BOTH boxes:
     - ☑ `teacherscambodia.com`
     - ☑ `www.teacherscambodia.com`
   - Click green **"SAVE"** button

3. **Wait for Installation**:
   - Should complete in 1-2 minutes
   - You'll see success message
   - Certificate will appear in "Automated SSL Certificates" table

4. **Enable Force HTTPS**:
   - Check box: ☑ **"Force SSL with https redirect"**
   - Click **"Save"** button

### Step 5: Test SSL

**Test both URLs:**
- `https://teacherscambodia.com` ✅
- `https://www.teacherscambodia.com` ✅

**Both should show:**
- ✅ Green padlock icon
- ✅ "Connection is secure"
- ✅ No SSL errors

## 🔍 Troubleshooting

### Issue: HTTP doesn't load (Step 1 fails)

**Solutions:**
1. Verify domain is added in DirectAdmin Domain Setup
2. Check if website files are uploaded
3. Contact Sabretooth support to verify domain configuration
4. Check DirectAdmin error logs

### Issue: Can't create `.well-known` folder

**Solutions:**
1. Make sure you're in the correct directory: `/domains/teacherscambodia.com/public_html/`
2. Check file permissions on parent directory (should be 755)
3. Try creating via FTP if File Manager doesn't work
4. Contact Sabretooth support if still having issues

### Issue: SSL certificate still fails after all steps

**Solutions:**
1. Wait 5-10 minutes and try again
2. Clear browser cache
3. Verify `.well-known/acme-challenge/` folder has 755 permissions
4. Check DirectAdmin error logs
5. Contact Sabretooth support

## 📋 Quick Checklist

- [x] DNS working (confirmed: both resolve to 144.76.98.182)
- [ ] HTTP accessible: `http://teacherscambodia.com` loads
- [ ] HTTP accessible: `http://www.teacherscambodia.com` loads
- [ ] Domain added in DirectAdmin
- [ ] Website files uploaded
- [ ] `.well-known/acme-challenge/` folder created (755 permissions)
- [ ] SSL certificate requested (both domains selected)
- [ ] Force HTTPS enabled
- [ ] Tested `https://teacherscambodia.com`
- [ ] Tested `https://www.teacherscambodia.com`

## 🎯 Current Status

✅ **DNS**: Working perfectly  
⏳ **Next**: Test HTTP accessibility and create ACME directory  
⏳ **Then**: Request SSL certificate

---

**You're almost there! DNS is working, now just need to ensure HTTP is accessible and create the ACME directory.** 🚀







