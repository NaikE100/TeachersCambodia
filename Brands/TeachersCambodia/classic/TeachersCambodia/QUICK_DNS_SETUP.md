# Quick DNS Setup - GoDaddy to Sabretooth

## 🎯 Quick Solution

Since custom nameservers aren't working, use **A Records** instead. This is actually easier!

## ⚡ 3 Simple Steps

### Step 1: Get Sabretooth IP Address
- Log into DirectAdmin: `https://sabretooth.hkdns.host:2222`
- Find your server IP address (check "Account Information" or contact support)
- Example IP: `123.45.67.89`

### Step 2: Add Domain in Sabretooth
- In DirectAdmin, go to "Domain Setup"
- Add: `teacherscambodia.com`
- This creates the directory for your website

### Step 3: Set A Record in GoDaddy
1. Go to GoDaddy → My Products → Domains → `teacherscambodia.com`
2. Click "DNS" or "Manage DNS"
3. Click "Add" to create a new record
4. Select type: **A**
5. **Host**: `@` (or leave blank)
6. **Value**: Enter your Sabretooth IP address
7. **TTL**: `600`
8. Click "Save"

### Optional: Add WWW Record
- Add another A record:
- **Host**: `www`
- **Value**: Same IP address
- Click "Save"

## ✅ Done!

- Keep nameservers as "GoDaddy Nameservers (recommended)"
- Don't change to custom nameservers
- Wait 1-4 hours for DNS to propagate
- Upload your website files to Sabretooth

## 🚀 Upload Files

Once domain is added in Sabretooth:
- Upload files to: `/domains/teacherscambodia.com/public_html/`
- See `SABRETOOTH_UPLOAD_GUIDE.md` for detailed instructions

---

**Need the IP address?** Contact Sabretooth support or check your hosting welcome email.







