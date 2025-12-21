# TeachersCambodia Website - Sabretooth Hosting Upload Guide

## 📋 Overview
This guide will help you upload the redesigned TeachersCambodia website to your Sabretooth hosting account.

## 🌐 Sabretooth Hosting Information
- **Hosting Panel**: DirectAdmin
- **Panel URL**: `https://sabretooth.hkdns.host:2222`
- **Domain**: teacherscambodia.com (or your configured domain)
- **File Manager**: Access via DirectAdmin File Manager

## 📁 Files Ready for Upload

The following files have been built and are ready to upload:

```
TeachersCambodia/
├── index.html                                    # Main HTML file
└── assets/
    ├── index-BCMVGVE0.css                        # Stylesheet
    ├── index-Sgs2ZMCQ.js                         # JavaScript bundle
    └── bda411d0cf69961e9fd1ed4168e4c5db4a3281eb-BThQRuk1.png  # Image asset
```

## 🚀 Step-by-Step Upload Instructions

### Step 1: Access DirectAdmin File Manager

1. **Log into DirectAdmin**:
   - Go to: `https://sabretooth.hkdns.host:2222`
   - Enter your username and password
   - Click "Login"

2. **Navigate to File Manager**:
   - Click on "File Manager" in the main menu
   - Navigate to your domain's directory (typically `/domains/teacherscambodia.com/public_html/`)
   - Or use the path: `/domains/teacherscambodia.com/`

### Step 2: Backup Existing Files (If Any)

1. **Create a backup folder**:
   - In File Manager, create a folder named `backup_YYYY-MM-DD` (use today's date)
   - Move any existing files to this backup folder

### Step 3: Upload Website Files

**Option A: Using DirectAdmin File Manager (Recommended)**

1. **Navigate to your domain root**:
   - Go to: `/domains/teacherscambodia.com/public_html/` (or your domain's root directory)

2. **Upload index.html**:
   - Click "Upload" button in File Manager
   - Select `index.html` from your local computer
   - Upload to the domain root directory

3. **Create assets folder**:
   - Click "Create Folder" and name it `assets`
   - Enter the `assets` folder

4. **Upload asset files**:
   - Upload the following files to the `assets` folder:
     - `index-BCMVGVE0.css`
     - `index-Sgs2ZMCQ.js`
     - `bda411d0cf69961e9fd1ed4168e4c5db4a3281eb-BThQRuk1.png`

**Option B: Using FTP Client (Alternative)**

1. **Get FTP Credentials**:
   - In DirectAdmin, go to "FTP Management"
   - Note your FTP username, password, and server address

2. **Connect via FTP**:
   - Use an FTP client (FileZilla, WinSCP, etc.)
   - Connect to: `sabretooth.hkdns.host` (or your FTP server)
   - Port: 21 (or as provided)
   - Username: Your FTP username
   - Password: Your FTP password

3. **Navigate to domain directory**:
   - Navigate to: `/domains/teacherscambodia.com/public_html/`

4. **Upload files**:
   - Upload `index.html` to the root
   - Create `assets` folder and upload all asset files

### Step 4: Verify File Structure

After uploading, your directory structure should look like this:

```
/domains/teacherscambodia.com/public_html/
├── index.html
└── assets/
    ├── index-BCMVGVE0.css
    ├── index-Sgs2ZMCQ.js
    └── bda411d0cf69961e9fd1ed4168e4c5db4a3281eb-BThQRuk1.png
```

### Step 5: Set File Permissions

1. **Set permissions for files**:
   - `index.html`: 644
   - All files in `assets/`: 644

2. **Set permissions for directories**:
   - `assets/`: 755

**To set permissions in DirectAdmin**:
- Right-click on each file/folder
- Select "Change Permissions"
- Enter the permission number (644 for files, 755 for folders)
- Click "Change"

### Step 6: Test the Website

1. **Visit your website**:
   - Go to: `http://teacherscambodia.com` (or your domain)
   - The website should load correctly

2. **Test all features**:
   - Check if the homepage loads
   - Test navigation (scroll to sections)
   - Verify images load correctly
   - Test contact forms (if applicable)
   - Test payment section (if applicable)
   - Check mobile responsiveness

## 🔧 Additional Configuration (Optional)

### Enable HTTPS/SSL

1. **In DirectAdmin**:
   - Go to "SSL Certificates"
   - Install Let's Encrypt SSL certificate (free)
   - Enable "Force HTTPS"

### Configure Custom Domain (If Needed)

1. **In DirectAdmin**:
   - Go to "Domain Setup"
   - Add your domain if not already added
   - Point DNS to your Sabretooth hosting IP

## 🐛 Troubleshooting

### Issue: Website shows blank page
**Solution**:
- Check browser console for errors (F12)
- Verify all files uploaded correctly
- Check file permissions (should be 644 for files, 755 for folders)
- Verify `index.html` is in the root directory

### Issue: CSS/JS files not loading
**Solution**:
- Verify `assets` folder exists and contains all files
- Check file paths in `index.html` (should be `/assets/...`)
- Verify file permissions are set to 644
- Clear browser cache (Ctrl+F5)

### Issue: Images not displaying
**Solution**:
- Verify image file uploaded to `assets` folder
- Check image file permissions (should be 644)
- Verify image path in the code

### Issue: 404 errors
**Solution**:
- Verify all files are in the correct directory
- Check that `index.html` is in the domain root
- Verify directory structure matches the guide

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all files were uploaded correctly
3. Check DirectAdmin error logs
4. Contact Sabretooth hosting support if needed

## ✅ Upload Checklist

- [ ] Backed up existing files (if any)
- [ ] Uploaded `index.html` to domain root
- [ ] Created `assets` folder
- [ ] Uploaded all CSS, JS, and image files to `assets` folder
- [ ] Set file permissions (644 for files, 755 for folders)
- [ ] Tested website in browser
- [ ] Verified all features work correctly
- [ ] Tested mobile responsiveness
- [ ] Enabled SSL/HTTPS (optional but recommended)

## 🎉 Success!

Once all files are uploaded and tested, your TeachersCambodia website should be live and accessible at your domain!

---

**Last Updated**: $(Get-Date -Format "yyyy-MM-dd")
**Website Version**: Redesigned Figma Version
**Build Date**: Production Build







