# TeachersCambodia Domain Setup Guide - Sabretooth Hosting

## ✅ Yes, You Can Host on Sabretooth!

Your domain `teacherscambodia.com` is currently parked with GoDaddy, but you can definitely host it on your Sabretooth account. Since custom nameservers aren't working, we'll use **A Records** instead (this is actually easier and more common).

## 🎯 Solution: Use A Records Instead of Nameservers

Instead of changing nameservers, we'll point your domain to Sabretooth's server using A records. This is the recommended approach when nameservers aren't registered.

## 🔧 Step 1: Get Sabretooth Server IP Address

1. **Log into Sabretooth DirectAdmin**:
   - Go to: `https://sabretooth.hkdns.host:2222`
   - Log in with your credentials

2. **Find Your Server IP Address**:
   - Look in "Account Information" or "Server Information"
   - Or check your hosting welcome email
   - Or contact Sabretooth support to get your server's IP address
   - Common location: DirectAdmin → "Account Information" → "Server IP"

3. **Note the IP Address**: 
   - It will look like: `123.45.67.89` (example)
   - You'll need this for the A record

## 🌐 Step 2: Add Domain in Sabretooth First

1. **Log into DirectAdmin**:
   - Go to: `https://sabretooth.hkdns.host:2222`

2. **Add Domain**:
   - Go to "Domain Setup" or "Add Domain"
   - Enter: `teacherscambodia.com`
   - Follow the setup wizard
   - This creates: `/domains/teacherscambodia.com/public_html/`

3. **Verify Domain is Added**:
   - You should see the domain in your domain list
   - The directory should be created

## 📋 Step 3: Configure DNS Records at GoDaddy

1. **Log into GoDaddy**:
   - Go to: `https://www.godaddy.com`
   - Log in to your account
   - Go to "My Products" → "Domains"
   - Click on `teacherscambodia.com`

2. **Go to DNS Management**:
   - Look for "DNS" or "Manage DNS" button
   - Click on it to open DNS records

3. **Remove/Update Existing Records**:
   - Delete or update any existing A records pointing to GoDaddy parking

4. **Add A Record**:
   - Click "Add" or "+" to add a new record
   - Select record type: **A**
   - **Host/Name**: `@` (or leave blank, or enter `teacherscambodia.com`)
   - **Value/Points to**: Enter your Sabretooth server IP address (from Step 1)
   - **TTL**: `600` (or default)
   - Click "Save"

5. **Add WWW A Record** (Optional but recommended):
   - Add another A record:
   - **Host/Name**: `www`
   - **Value/Points to**: Same Sabretooth server IP address
   - **TTL**: `600`
   - Click "Save"

6. **Keep Nameservers as GoDaddy**:
   - Leave nameservers set to "GoDaddy Nameservers (recommended)"
   - Don't change to custom nameservers

## ⏱️ Step 4: Wait for DNS Propagation

- **DNS propagation** can take 1-24 hours (usually 1-4 hours)
- During this time, the domain might still show GoDaddy's parked page
- You can check propagation status at: `https://www.whatsmydns.net`
- Search for `teacherscambodia.com` and check A record

## 🚀 Step 5: Upload Your Website Files

Once the domain is added in Sabretooth (you don't need to wait for DNS):

1. **Navigate to domain directory**:
   - Go to File Manager in DirectAdmin
   - Navigate to: `/domains/teacherscambodia.com/public_html/`

2. **Upload files** (see `SABRETOOTH_UPLOAD_GUIDE.md` for details):
   - Upload `index.html` to the root
   - Create `assets` folder and upload all asset files
   - Set permissions: Files (644), Folders (755)

3. **Test the website**:
   - Once DNS propagates, visit: `http://teacherscambodia.com`
   - The website should load

## 🔍 Alternative: Test Before DNS Propagates

You can test your website before DNS fully propagates:

1. **Access via IP** (temporary):
   - Use: `http://your-server-ip/~your-username/teacherscambodia.com/`
   - Or ask Sabretooth support for the exact URL format

2. **Edit Hosts File** (local testing only):
   - On Windows: `C:\Windows\System32\drivers\etc\hosts`
   - Add: `your-server-ip teacherscambodia.com`
   - This only works on your computer for testing

## 📞 Need Help Finding IP Address?

### Option 1: Check DirectAdmin
- Log into DirectAdmin
- Look for "Account Information" or "Server Information"
- Find "Shared IP" or "Server IP"

### Option 2: Contact Sabretooth Support
- Email or call Sabretooth support
- Ask: "What is the IP address for my hosting account?"
- They'll provide it quickly

### Option 3: Check Other Domains
- If you have other domains hosted on Sabretooth, check their A records
- They should point to the same IP

## 🐛 Troubleshooting

### Issue: Can't find IP address
**Solution**:
- Contact Sabretooth support - they can provide it immediately
- Check your hosting welcome email
- Look in DirectAdmin under account information

### Issue: DNS not updating
**Solution**:
- Wait 24-48 hours (normal propagation time)
- Clear your browser cache
- Try accessing from a different network
- Check DNS propagation: `https://www.whatsmydns.net`

### Issue: Website shows parked page after DNS update
**Solution**:
- Verify A record is set correctly in GoDaddy
- Wait a bit longer for DNS to fully propagate
- Clear browser cache
- Try accessing from different device/network

### Issue: Can't add domain in Sabretooth
**Solution**:
- Verify your hosting plan allows adding domains
- Contact Sabretooth support for assistance
- Check if domain is already added to another account

## ✅ Checklist

- [ ] Got Sabretooth server IP address
- [ ] Added domain in Sabretooth DirectAdmin
- [ ] Configured A record in GoDaddy DNS (points to Sabretooth IP)
- [ ] Added www A record (optional but recommended)
- [ ] Left nameservers as GoDaddy (don't change to custom)
- [ ] Uploaded website files to `/domains/teacherscambodia.com/public_html/`
- [ ] Set correct file permissions (644 for files, 755 for folders)
- [ ] Waited for DNS propagation (check with whatsmydns.net)
- [ ] Tested website in browser
- [ ] Website loads correctly

## 🎉 Success!

Once DNS propagates and files are uploaded, your TeachersCambodia website will be live on Sabretooth hosting!

---

## 📝 Summary

**Instead of changing nameservers:**
1. Get Sabretooth server IP address
2. Add domain in Sabretooth DirectAdmin
3. Set A record in GoDaddy DNS to point to Sabretooth IP
4. Upload website files
5. Wait for DNS to propagate
6. Website goes live!

**Note**: Using A records is actually the preferred method when nameservers aren't registered. This approach works perfectly and is commonly used.
