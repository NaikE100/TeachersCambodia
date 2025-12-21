# SSL Certificate Fix - NET::ERR_CERT_COMMON_NAME_INVALID

## 🔴 Problem

You're seeing the error: **"NET::ERR_CERT_COMMON_NAME_INVALID"** when accessing `www.teacherscambodia.com`

This happens because:
- The SSL certificate was issued for `teacherscambodia.com` only
- You're trying to access `www.teacherscambodia.com`
- The certificate doesn't include the `www` subdomain

## ✅ Solution: Fix SSL Certificate in DirectAdmin

### Option 1: Add Automated SSL Certificate (Recommended)

**Current Status**: `teacherscambodia.com` is NOT in your automated SSL certificates list. You need to add it.

1. **Navigate to SSL Certificates Page**:
   - You should already be at: `sabretooth.hkdns.host:2222/evo/user/ssl/server`
   - **IMPORTANT**: Make sure you're viewing the SSL Certificates page for `teacherscambodia.com`
   - If you see a domain dropdown/selector at the top, select `teacherscambodia.com`
   - If you're on a different domain's SSL page, navigate to `teacherscambodia.com` first

2. **Select "Get automatic certificate from ACME Provider"**:
   - In the certificate management options section
   - Click the radio button: **"Get automatic certificate from ACME Provider"**
   - This will show options for Let's Encrypt (ACME)

3. **Configure Certificate to Include Both Domains**:
   - When the ACME/Let's Encrypt options appear, you'll see checkboxes for domains
   - **CRITICAL**: Check BOTH boxes:
     - ☑ `teacherscambodia.com`
     - ☑ `www.teacherscambodia.com`
   - This ensures the certificate covers both the root domain and www subdomain
   - (Similar to how `trueselfgiveback.com` shows both `trueselfgiveback.com` and `www.trueselfgiveback.com`)

4. **Save and Request Certificate**:
   - Click the green **"SAVE"** button
   - DirectAdmin will automatically request and install the certificate from Let's Encrypt
   - This usually takes 1-2 minutes
   - You'll see a success message when complete

5. **Verify Certificate Appears in Automated List**:
   - After installation, refresh the page
   - `teacherscambodia.com` should now appear in the "Automated SSL Certificates" table
   - Under "SNI Hosts" column, you should see:
     - `teacherscambodia.com`
     - `www.teacherscambodia.com`
   - (Just like `trueselfgiveback.com` shows in your current list)

6. **Enable Force HTTPS Redirect**:
   - In the "Force SSL with HTTPS Redirect" section
   - Check the box: ☑ **"Force SSL with https redirect"**
   - Click the **"Save"** button next to it
   - This automatically redirects `http://` to `https://`

7. **Test Both URLs**:
   - Visit: `https://teacherscambodia.com` ✅
   - Visit: `https://www.teacherscambodia.com` ✅
   - Both should now work without SSL errors

### Option 2: Set Up Redirect (Alternative)

If you can't regenerate the certificate, set up a redirect:

1. **In DirectAdmin**:
   - Go to "Domain Setup" → `teacherscambodia.com`
   - Look for "Redirects" or "URL Redirects"

2. **Create Redirect**:
   - Redirect `www.teacherscambodia.com` → `teacherscambodia.com`
   - Or redirect `teacherscambodia.com` → `www.teacherscambodia.com`
   - Choose your preferred version (www or non-www)

3. **Enable SSL for Redirected Domain**:
   - Make sure SSL is enabled for the domain you're redirecting TO
   - Users will automatically be redirected to the SSL-enabled version

## 🔍 Verify SSL Certificate

After fixing, verify the certificate includes both domains:

1. **In Browser**:
   - Visit `https://www.teacherscambodia.com`
   - Click the padlock icon in the address bar
   - Click "Certificate" or "Connection is secure"
   - Check "Subject Alternative Name (SAN)" section
   - Should list both:
     - `teacherscambodia.com`
     - `www.teacherscambodia.com`

2. **Online SSL Checker**:
   - Visit: `https://www.ssllabs.com/ssltest/`
   - Enter: `teacherscambodia.com`
   - Check certificate details

## 🐛 Troubleshooting

### Issue: Certificate still shows error after regeneration

**Solutions**:
- Clear browser cache (Ctrl+F5)
- Try incognito/private browsing mode
- Wait 5-10 minutes for certificate propagation
- Check DNS - make sure both `www` and non-www point to same server

### Issue: Can't select both domains in Let's Encrypt

**Solutions**:
- Make sure `www` A record exists in DNS
- Verify domain is properly added in DirectAdmin
- Contact Sabretooth support if option doesn't appear

### Issue: "Get automatic certificate from ACME Provider" doesn't show domain options

**Solutions**:
- Make sure you've selected `teacherscambodia.com` domain first
- Verify the domain is properly added in DirectAdmin Domain Setup
- Check that DNS records are pointing to the server
- Try refreshing the page
- Contact Sabretooth support if the option doesn't appear

### ⚠️ CRITICAL: ACME Challenge Error - "Could not execute your request"

**Error Message**: 
- "`teacherscambodia.com` was skipped due to unreachable `http://teacherscambodia.com/.well-known/acme-challenge/...` file"
- "No domains pointing to this server to generate the certificate for"

**This means**: Let's Encrypt cannot verify you own the domain because it can't reach your server via HTTP.

**Step-by-Step Fix**:

1. **Verify DNS is Pointing to Server**:
   - Go to: `https://www.whatsmydns.net`
   - Search for: `teacherscambodia.com` (A record)
   - Search for: `www.teacherscambodia.com` (A record)
   - Both should show your Sabretooth server IP address
   - If they show different IPs or don't resolve, DNS is the problem

2. **Check DNS Records in GoDaddy**:
   - Log into GoDaddy → My Products → Domains → `teacherscambodia.com`
   - Go to DNS Management
   - Verify A record for `@` points to your Sabretooth IP
   - Verify A record for `www` points to your Sabretooth IP
   - If missing or incorrect, update them now
   - Wait 1-4 hours for DNS propagation

3. **Test Domain Accessibility**:
   - Open a new browser tab (or incognito mode)
   - Try: `http://teacherscambodia.com` (HTTP, not HTTPS)
   - Try: `http://www.teacherscambodia.com` (HTTP, not HTTPS)
   - Both should load your website (even if it shows "Not secure")
   - If you get "This site can't be reached" or connection timeout, DNS isn't working yet

4. **Verify Domain is Added in DirectAdmin**:
   - In DirectAdmin, go to "Domain Setup"
   - Verify `teacherscambodia.com` is listed
   - If not, add it now (see Domain Setup guides)

5. **Check File Permissions**:
   - In DirectAdmin File Manager
   - Navigate to: `/domains/teacherscambodia.com/public_html/`
   - Create folder: `.well-known` (if it doesn't exist)
   - Inside `.well-known`, create folder: `acme-challenge`
   - Set permissions:
     - `.well-known` folder: 755
     - `acme-challenge` folder: 755
   - This allows Let's Encrypt to write verification files

6. **Wait for DNS Propagation**:
   - DNS changes can take 1-24 hours
   - Use `https://www.whatsmydns.net` to monitor propagation
   - Don't try SSL certificate until DNS is fully propagated

7. **Retry SSL Certificate**:
   - Once DNS is working and domain is accessible via HTTP
   - Go back to SSL Certificates page
   - Select "Get automatic certificate from ACME Provider"
   - Check both domains
   - Click SAVE
   - Should work now!

**Quick Test Command**:
```cmd
nslookup teacherscambodia.com
nslookup www.teacherscambodia.com
```
Both should return your Sabretooth server IP address.

### Issue: Certificate created but still shows error

**Solutions**:
- Wait 2-5 minutes for certificate propagation
- Clear browser cache (Ctrl+F5)
- Try incognito/private browsing mode
- Verify certificate appears in "Automated SSL Certificates" table
- Check that both domains are listed under "SNI Hosts"
- Make sure "Force SSL with https redirect" is enabled

### Issue: HSTS Error (as shown in your screenshot)

**Solutions**:
- HSTS (HTTP Strict Transport Security) is enabled
- You MUST use HTTPS (not HTTP)
- Clear browser HSTS cache:
  - Chrome: Go to `chrome://net-internals/#hsts`
  - Delete `teacherscambodia.com` from HSTS list
  - Or wait 24 hours for HSTS to expire

## 📋 Quick Checklist

- [ ] Logged into DirectAdmin
- [ ] Went to SSL Certificates
- [ ] Selected `teacherscambodia.com`
- [ ] Requested Let's Encrypt certificate
- [ ] Checked BOTH `teacherscambodia.com` AND `www.teacherscambodia.com`
- [ ] Waited for certificate installation
- [ ] Enabled Force HTTPS (optional)
- [ ] Tested `https://teacherscambodia.com`
- [ ] Tested `https://www.teacherscambodia.com`
- [ ] Verified certificate includes both domains

## ✅ Expected Result

After completing these steps:
- ✅ `https://teacherscambodia.com` works
- ✅ `https://www.teacherscambodia.com` works
- ✅ No SSL certificate errors
- ✅ Green padlock in browser
- ✅ "Connection is secure" message

## 🆘 Still Having Issues?

1. **Contact Sabretooth Support**:
   - They can verify SSL certificate configuration
   - They can check server settings
   - They can regenerate certificate if needed

2. **Check DNS Records**:
   - Verify both `@` and `www` A records point to same IP
   - Use: `https://www.whatsmydns.net`

3. **Wait for Propagation**:
   - SSL changes can take 5-15 minutes
   - DNS changes can take 1-24 hours
   - Be patient!

---

**Most Common Fix**: Regenerate Let's Encrypt certificate with BOTH domains selected! 🎯

