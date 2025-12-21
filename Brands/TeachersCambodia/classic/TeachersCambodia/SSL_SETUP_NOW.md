# SSL Certificate Setup - HTTP Working!

## ✅ Current Status

- ✅ DNS working: Both domains resolve to `144.76.98.182`
- ✅ HTTP accessible: Website loads at `http://www.teacherscambodia.com`
- ❌ SSL certificate missing or invalid: Shows "Not secure"

## 🎯 Next Steps to Fix SSL

### Step 1: Verify ACME Challenge Directory Exists

**In DirectAdmin File Manager:**

1. Navigate to: `/domains/teacherscambodia.com/public_html/`

2. **Check if `.well-known` folder exists:**
   - Look for a folder named `.well-known` (starts with a dot)
   - If it doesn't exist, create it:
     - Click "Create Folder"
     - Name: `.well-known` (with the dot at the start)
     - Set permissions: **755**

3. **Check if `acme-challenge` folder exists inside `.well-known`:**
   - Open `.well-known` folder
   - Look for `acme-challenge` folder
   - If it doesn't exist, create it:
     - Click "Create Folder"
     - Name: `acme-challenge`
     - Set permissions: **755**

4. **Final structure should be:**
   ```
   /domains/teacherscambodia.com/public_html/
   ├── index.html
   ├── assets/ (your website files)
   └── .well-known/
       └── acme-challenge/
   ```

### Step 2: Test ACME Challenge Directory Accessibility

**Verify Let's Encrypt can access the directory:**

1. **Create a test file:**
   - Go to: `/domains/teacherscambodia.com/public_html/.well-known/acme-challenge/`
   - Create new file: `test.txt`
   - Add content: `test`
   - Set permissions: **644**
   - Save

2. **Test in browser:**
   - Visit: `http://www.teacherscambodia.com/.well-known/acme-challenge/test.txt`
   - Should display: `test`
   - If you see "test", the directory is accessible ✅
   - If you get 404, check folder permissions (must be 755)

3. **Delete test file** after testing (optional)

### Step 3: Generate SSL Certificate

**Now that HTTP is working, generate the certificate:**

1. **Go to SSL Certificates:**
   - Navigate to: `sabretooth.hkdns.host:2222/evo/user/ssl/letsencrypt`
   - Make sure `teacherscambodia.com` is selected

2. **Configure Certificate:**
   - Select: **"Get automatic certificate from ACME Provider"**
   - ACME Provider: **Let's Encrypt**
   - Common Name: `teacherscambodia.com`
   - Key Size: **EC-384** (or RSA 2048)
   - Certificate Type: **SHA256**

3. **Select Domains:**
   - **CRITICAL**: Check BOTH boxes:
     - ☑ `teacherscambodia.com`
     - ☑ `www.teacherscambodia.com`
   - Leave other subdomains unchecked (ftp, mail, etc.)

4. **Save:**
   - Click green **"SAVE"** button
   - Wait 1-2 minutes for certificate generation

5. **Check Result:**
   - If successful, certificate appears in "Automated SSL Certificates" table
   - You'll see both domains listed under "SNI Hosts"
   - If error, check error message and verify `.well-known` directory

### Step 4: Enable Force HTTPS Redirect

**After certificate is generated:**

1. **Go to main SSL Certificates page:**
   - Navigate to: `sabretooth.hkdns.host:2222/evo/user/ssl/server`
   - Make sure `teacherscambodia.com` is selected

2. **Enable HTTPS Redirect:**
   - Find "Force SSL with HTTPS Redirect" section
   - Check the box: ☑ **"Force SSL with https redirect"**
   - Click **"Save"** button

3. **This will:**
   - Automatically redirect `http://` to `https://`
   - Force all traffic to use secure connection

### Step 5: Test SSL Certificate

**Verify everything works:**

1. **Test both URLs:**
   - `https://teacherscambodia.com` ✅
   - `https://www.teacherscambodia.com` ✅

2. **What you should see:**
   - ✅ Green padlock icon in address bar
   - ✅ "Connection is secure" message
   - ✅ No "Not secure" warning
   - ✅ Website loads correctly

3. **If still shows "Not secure":**
   - Clear browser cache (Ctrl+F5)
   - Try incognito/private browsing mode
   - Wait 2-5 minutes for certificate propagation
   - Check certificate details:
     - Click padlock icon → Certificate
     - Verify both domains listed in "Subject Alternative Name"

## 🔍 Troubleshooting

### Issue: Certificate generation still fails

**Check:**
1. `.well-known/acme-challenge/` directory exists with 755 permissions
2. Test file accessible: `http://www.teacherscambodia.com/.well-known/acme-challenge/test.txt`
3. Both domains checked in certificate request
4. Wait 5 minutes and try again

### Issue: Certificate generated but still shows "Not secure"

**Solutions:**
1. Clear browser cache (Ctrl+F5)
2. Try incognito mode
3. Wait 2-5 minutes for propagation
4. Verify certificate includes both domains:
   - Click padlock → Certificate → Details
   - Check "Subject Alternative Name" section
   - Should list both `teacherscambodia.com` and `www.teacherscambodia.com`

### Issue: Works for one domain but not the other

**If `https://teacherscambodia.com` works but `https://www.teacherscambodia.com` doesn't:**
- Certificate might only include one domain
- Regenerate certificate with BOTH domains selected
- Or set up redirect from www to non-www (or vice versa)

## 📋 Quick Checklist

- [x] DNS working ✅
- [x] HTTP accessible ✅
- [ ] `.well-known/acme-challenge/` directory exists (755 permissions)
- [ ] Test file accessible via HTTP
- [ ] SSL certificate requested (both domains selected)
- [ ] Certificate appears in "Automated SSL Certificates" table
- [ ] Force HTTPS redirect enabled
- [ ] `https://teacherscambodia.com` shows green padlock
- [ ] `https://www.teacherscambodia.com` shows green padlock

## ✅ Expected Result

After completing these steps:
- ✅ Green padlock icon in browser
- ✅ "Connection is secure" message
- ✅ No SSL errors
- ✅ Both www and non-www work with HTTPS

---

**You're almost there! HTTP is working, now just need to generate the SSL certificate.** 🚀







