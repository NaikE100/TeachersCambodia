# Next Steps - DNS is Correct!

## ✅ Good News: DNS is Already Correct!

Your A record is pointing to Sabretooth IP: `102.249.66.76` ✓

The connection timeout is likely because the domain needs to be added in Sabretooth and files need to be uploaded.

## 🎯 What to Do Next

### Step 1: Add Domain in Sabretooth DirectAdmin (CRITICAL!)

**This is the most important step:**

1. **Log into Sabretooth DirectAdmin**:
   - Go to: `https://sabretooth.hkdns.host:2222`
   - Log in with your credentials

2. **Add the Domain**:
   - Go to "Domain Setup" or "Add Domain" or "Domain Management"
   - Click "Add Domain" or "Create Domain"
   - Enter: `teacherscambodia.com`
   - Follow the setup wizard
   - Click "Create" or "Add"

3. **Verify Domain is Added**:
   - Check that `teacherscambodia.com` appears in your domain list
   - The directory should be created: `/domains/teacherscambodia.com/public_html/`

### Step 2: Upload Website Files

**Once the domain is added:**

1. **Go to File Manager in DirectAdmin**:
   - Click "File Manager" in the main menu
   - Navigate to: `/domains/teacherscambodia.com/public_html/`

2. **Upload Your Website Files**:
   - Upload `index.html` to the root of `public_html/`
   - Create an `assets` folder inside `public_html/`
   - Upload all files from your local `assets/` folder:
     - `index-BCMVGVE0.css`
     - `index-Sgs2ZMCQ.js`
     - `bda411d0cf69961e9fd1ed4168e4c5db4a3281eb-BThQRuk1.png`

3. **Set File Permissions**:
   - **Files**: Right-click → Change Permissions → Set to `644`
   - **Folders**: Right-click → Change Permissions → Set to `755`
   - Apply to:
     - `index.html` → 644
     - `assets/` folder → 755
     - All files inside `assets/` → 644

### Step 3: Verify Website Structure

**Your file structure should look like this:**

```
/domains/teacherscambodia.com/public_html/
├── index.html
└── assets/
    ├── index-BCMVGVE0.css
    ├── index-Sgs2ZMCQ.js
    └── bda411d0cf69961e9fd1ed4168e4c5db4a3281eb-BThQRuk1.png
```

### Step 4: Test the Website

1. **Wait a few minutes** after uploading files
2. **Clear your browser cache**: Ctrl+F5 or clear cache completely
3. **Try accessing**: `http://teacherscambodia.com`
4. **If still not working**, try:
   - `https://teacherscambodia.com` (with HTTPS)
   - Wait 5-10 minutes for server to recognize the domain
   - Try from a different browser or incognito mode

## 🔍 Troubleshooting

### Issue: Can't Find "Add Domain" in DirectAdmin

**Look for:**
- "Domain Setup"
- "Domain Management"
- "Add Domain"
- "Create Domain"
- "Domain Administration"

**If you can't find it:**
- Contact Sabretooth support
- They can add the domain for you
- Or check if your hosting plan allows adding domains

### Issue: Domain Already Exists

**If you see an error that domain already exists:**
- The domain might already be added
- Check the domain list
- Go directly to File Manager and navigate to the domain directory

### Issue: Still Getting Timeout After Adding Domain

**Check:**
1. **Files are uploaded correctly**: Verify `index.html` and `assets/` folder exist
2. **File permissions are correct**: 644 for files, 755 for folders
3. **Wait a few minutes**: Server needs time to recognize the domain
4. **Clear browser cache**: Ctrl+F5
5. **Contact Sabretooth support**: There might be a server configuration issue

### Issue: 403 Forbidden or 404 Not Found

**403 Forbidden:**
- Check file permissions (should be 644 for files, 755 for folders)
- Verify `index.html` is in the correct location

**404 Not Found:**
- Verify files are uploaded to `/domains/teacherscambodia.com/public_html/`
- Check that `index.html` exists
- Verify file names are correct (case-sensitive on some servers)

## ✅ Checklist

- [ ] DNS A record points to `102.249.66.76` ✓ (Already done!)
- [ ] Domain added in Sabretooth DirectAdmin
- [ ] Directory `/domains/teacherscambodia.com/public_html/` exists
- [ ] `index.html` uploaded to `public_html/`
- [ ] `assets/` folder created in `public_html/`
- [ ] All asset files uploaded to `assets/` folder
- [ ] File permissions set: Files (644), Folders (755)
- [ ] Cleared browser cache
- [ ] Tested website in browser
- [ ] Website loads correctly

## 🎯 Most Important Step

**Add the domain in Sabretooth DirectAdmin FIRST!**

Without adding the domain in Sabretooth, the server won't know to serve your website, even though DNS is pointing to it.

## 📞 Need Help?

**If you can't find where to add the domain:**
- Contact Sabretooth support
- Ask: "How do I add a domain to my hosting account?"
- They can guide you or add it for you

**If domain is added but still not working:**
- Verify files are uploaded correctly
- Check file permissions
- Contact Sabretooth support for assistance

---

## 🚀 Summary

1. ✅ **DNS is correct** - Already pointing to Sabretooth (102.249.66.76)
2. ⏳ **Add domain in Sabretooth** - Do this now!
3. ⏳ **Upload website files** - After domain is added
4. ⏳ **Set permissions** - 644 for files, 755 for folders
5. ⏳ **Test website** - Should work after domain is added

**The connection timeout will be resolved once the domain is added in Sabretooth!**







