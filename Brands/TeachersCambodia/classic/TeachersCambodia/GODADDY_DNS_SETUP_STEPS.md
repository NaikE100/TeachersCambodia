# GoDaddy DNS Setup - Step by Step Instructions

## ✅ Keep Default Nameservers - Use DNS Records Instead

**Important**: Don't click "Change Nameservers"! Keep using GoDaddy's default nameservers and just modify the DNS records.

## 🎯 Step-by-Step Instructions

### Step 1: Switch to DNS Records Tab

1. **You're currently on**: "Nameservers" tab (where you are now)
2. **Click on**: "DNS Records" tab (next to "Nameservers")
3. **Leave nameservers as default**: `ns61.domaincontrol.com` and `ns62.domaincontrol.com`

### Step 2: Get Your Sabretooth IP Address

**Before adding DNS records, you need your Sabretooth server IP address:**

1. Log into Sabretooth DirectAdmin: `https://sabretooth.hkdns.host:2222`
2. Find your server IP address:
   - Go to "Account Information" or "Server Information"
   - Look for "Shared IP" or "Server IP"
   - Or contact Sabretooth support
   - Example: `123.45.67.89`

### Step 3: Add Domain in Sabretooth First

1. In Sabretooth DirectAdmin, go to "Domain Setup"
2. Add domain: `teacherscambodia.com`
3. This creates: `/domains/teacherscambodia.com/public_html/`

### Step 4: Configure A Record in GoDaddy

1. **In GoDaddy, go to "DNS Records" tab** (not Nameservers)
2. **Look for existing A records** - you might see one pointing to GoDaddy parking
3. **Add/Edit A record**:
   - Click "Add" or edit existing A record for `@` (root domain)
   - **Type**: A
   - **Name/Host**: `@` (or leave blank, or `teacherscambodia.com`)
   - **Value**: Enter your Sabretooth server IP address
   - **TTL**: `600` (or leave default)
   - Click "Save"

4. **Add WWW A record** (optional but recommended):
   - Click "Add" again
   - **Type**: A
   - **Name/Host**: `www`
   - **Value**: Same Sabretooth server IP address
   - **TTL**: `600`
   - Click "Save"

### Step 5: Remove/Update GoDaddy Parking Records

1. **Look for any A records** pointing to GoDaddy parking IPs
2. **Edit or delete them** so they don't conflict
3. **Your domain should now point to Sabretooth IP**

## 📋 What Your DNS Records Should Look Like

After setup, you should have:

```
Type    Name    Value                TTL
A       @       [Sabretooth IP]      600
A       www     [Sabretooth IP]      600
```

**Keep these default nameservers:**
- `ns61.domaincontrol.com`
- `ns62.domaincontrol.com`

## ⏱️ Step 6: Wait for DNS Propagation

- DNS changes can take 1-24 hours (usually 1-4 hours)
- Check propagation: https://www.whatsmydns.net
- Search for `teacherscambodia.com` and check A record

## 🚀 Step 7: Upload Website Files

Once domain is added in Sabretooth:

1. Go to DirectAdmin File Manager
2. Navigate to: `/domains/teacherscambodia.com/public_html/`
3. Upload your website files:
   - `index.html`
   - `assets/` folder with all files
4. Set permissions: Files (644), Folders (755)

## ✅ Summary

1. ✅ **Keep default nameservers** (don't change them)
2. ✅ **Go to "DNS Records" tab** (not Nameservers)
3. ✅ **Add A record** pointing to Sabretooth IP
4. ✅ **Add domain in Sabretooth** DirectAdmin
5. ✅ **Upload website files** to Sabretooth
6. ✅ **Wait for DNS to propagate**
7. ✅ **Website goes live!**

## 🐛 Troubleshooting

### Can't find Sabretooth IP?
- Contact Sabretooth support
- Check your hosting welcome email
- Look in DirectAdmin "Account Information"

### DNS Records not showing?
- Make sure you're on "DNS Records" tab, not "Nameservers"
- Refresh the page
- Wait a few minutes and try again

### Website still shows parked page?
- Wait longer for DNS propagation (can take up to 24 hours)
- Clear browser cache
- Check DNS propagation: https://www.whatsmydns.net
- Verify A record is set correctly

---

**Key Point**: Keep GoDaddy's default nameservers and just modify the DNS Records (A records) to point to your Sabretooth IP address. This is the standard way to do it!







