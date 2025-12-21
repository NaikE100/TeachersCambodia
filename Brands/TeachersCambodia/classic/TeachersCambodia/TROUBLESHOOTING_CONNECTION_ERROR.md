# Troubleshooting Connection Timeout Error

## 🔴 Error: "ERR_CONNECTION_TIMED_OUT"

This error means the browser can't reach the server. Let's troubleshoot step by step.

## ✅ Step-by-Step Troubleshooting

### Step 1: Verify Domain is Added in Sabretooth

**Check if the domain is set up in Sabretooth DirectAdmin:**

1. **Log into DirectAdmin**: `https://sabretooth.hkdns.host:2222`
2. **Check Domain List**:
   - Go to "Domain Setup" or "Domain Management"
   - Verify `teacherscambodia.com` is listed
   - If not, add it now (see Domain Setup guide)

3. **Verify Directory Exists**:
   - Go to File Manager
   - Check if `/domains/teacherscambodia.com/public_html/` exists
   - If not, the domain wasn't added correctly

### Step 2: Verify DNS Records in GoDaddy

**Check if A record is pointing to correct IP:**

1. **Go to GoDaddy DNS Records**
2. **Verify A record**:
   - Should have Name: `@`
   - Should point to your Sabretooth server IP (not "Parked")
   - TTL: 600 seconds

3. **Check DNS Propagation**:
   - Visit: https://www.whatsmydns.net
   - Search for: `teacherscambodia.com`
   - Select record type: **A**
   - Check if IP matches your Sabretooth IP
   - If different or not propagated, wait longer (can take 24 hours)

### Step 3: Verify Website Files are Uploaded

**Check if files are in the correct location:**

1. **In Sabretooth DirectAdmin File Manager**:
   - Navigate to: `/domains/teacherscambodia.com/public_html/`
   - Verify `index.html` exists
   - Verify `assets/` folder exists with files inside

2. **If files are missing**:
   - Upload them now (see Upload Guide)
   - Set correct permissions: Files (644), Folders (755)

### Step 4: Check Server IP Address

**Verify you're using the correct IP:**

1. **Confirm Sabretooth IP**:
   - Check DirectAdmin "Account Information"
   - Contact Sabretooth support to verify
   - Make sure A record in GoDaddy matches this IP exactly

2. **Test IP directly**:
   - Try accessing: `http://[your-sabretooth-ip]`
   - If this doesn't work, there might be a server issue
   - Contact Sabretooth support

### Step 5: Wait for DNS Propagation

**DNS changes can take time:**

1. **Normal propagation time**: 1-24 hours (usually 1-4 hours)
2. **Check propagation status**: https://www.whatsmydns.net
3. **Clear browser cache**: Ctrl+F5 or clear cache completely
4. **Try different browser**: Test in incognito/private mode
5. **Try different network**: Test from mobile data or different Wi-Fi

### Step 6: Check for Firewall Issues

**Server might be blocking connections:**

1. **Contact Sabretooth support**:
   - Ask if there are any firewall rules blocking the domain
   - Verify the domain is properly configured on their end
   - Check if port 80/443 is open

2. **Check server status**:
   - Verify Sabretooth server is running
   - Check if other domains on same server are working

## 🔍 Quick Diagnostics

### Test 1: Check DNS Resolution

**In Command Prompt (Windows):**
```cmd
nslookup teacherscambodia.com
```

**What to look for:**
- Should show your Sabretooth IP address
- If it shows different IP or fails, DNS hasn't propagated

### Test 2: Check if Domain is Accessible via IP

**If you know your Sabretooth IP:**
- Try: `http://[your-ip]/~[your-username]/teacherscambodia.com/`
- Or contact Sabretooth for the exact URL format
- If this works, it's a DNS issue

### Test 3: Check File Permissions

**In DirectAdmin File Manager:**
- Verify `index.html` has permission: 644
- Verify `assets/` folder has permission: 755
- Verify files in `assets/` have permission: 644

## 🐛 Common Issues & Solutions

### Issue 1: Domain Not Added in Sabretooth
**Solution**: Add the domain in DirectAdmin first

### Issue 2: DNS Not Updated in GoDaddy
**Solution**: Update A record to point to Sabretooth IP (not "Parked")

### Issue 3: DNS Not Propagated
**Solution**: Wait 1-24 hours, check with whatsmydns.net

### Issue 4: Files Not Uploaded
**Solution**: Upload website files to `/domains/teacherscambodia.com/public_html/`

### Issue 5: Wrong IP Address
**Solution**: Verify correct IP with Sabretooth support

### Issue 6: Server/Firewall Issue
**Solution**: Contact Sabretooth support to check server configuration

## ✅ Checklist - Verify Everything

- [ ] Domain added in Sabretooth DirectAdmin
- [ ] Directory `/domains/teacherscambodia.com/public_html/` exists
- [ ] A record in GoDaddy points to Sabretooth IP (not "Parked")
- [ ] Website files uploaded (`index.html` and `assets/` folder)
- [ ] File permissions set correctly (644 for files, 755 for folders)
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] Waited at least 1-4 hours after DNS change
- [ ] Cleared browser cache
- [ ] Tried different browser/network
- [ ] Contacted Sabretooth support if issues persist

## 📞 Next Steps

1. **Verify domain is added in Sabretooth** (most important!)
2. **Check DNS records in GoDaddy** (make sure A record points to correct IP)
3. **Upload website files** (if not already done)
4. **Wait for DNS propagation** (can take 1-24 hours)
5. **Contact Sabretooth support** if domain is added but still not working

## 🎯 Most Likely Causes

1. **Domain not added in Sabretooth** (most common)
2. **DNS not updated** (A record still shows "Parked")
3. **DNS not propagated yet** (need to wait longer)
4. **Files not uploaded** (directory is empty)
5. **Wrong IP address** (A record points to wrong IP)

---

**Important**: The domain MUST be added in Sabretooth DirectAdmin first before DNS will work. If you haven't added it yet, do that now!







