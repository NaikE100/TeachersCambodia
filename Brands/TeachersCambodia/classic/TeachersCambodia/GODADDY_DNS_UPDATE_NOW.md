# Update DNS Records Now - Exact Steps

## 🎯 What You're Seeing

You have **2 A records** with Name `@`:
1. One pointing to IP: `102.249.66.76`
2. One pointing to: `Parked` (GoDaddy parking page)

## ✅ What You Need to Do

### Option 1: Edit the "Parked" Record (Recommended)

1. **Find the A record with Data: "Parked"**
2. **Click the Edit icon** (pencil icon) next to it
3. **Change the Data/Value field**:
   - Delete: `Parked`
   - Enter: Your Sabretooth server IP address
   - (You need to get this from Sabretooth first - see below)
4. **Keep TTL**: `600 seconds` (or leave as is)
5. **Click "Save"**

### Option 2: Delete "Parked" and Edit the Other One

1. **Delete the "Parked" A record**:
   - Click the Delete icon (trash can) next to the "Parked" record
   - Confirm deletion

2. **Edit the A record with IP `102.249.66.76`**:
   - Click the Edit icon (pencil) next to it
   - Change the Data/Value to: Your Sabretooth server IP address
   - Click "Save"

### Option 3: Delete Both and Add New (Cleanest)

1. **Delete both A records**:
   - Delete the one with `102.249.66.76`
   - Delete the one with `Parked`

2. **Add a new A record**:
   - Click "Add New Record" button (at the top)
   - Select Type: **A**
   - Name: `@` (or leave blank)
   - Data/Value: Enter your Sabretooth server IP address
   - TTL: `600 seconds`
   - Click "Save"

## 🔍 Step 1: Get Your Sabretooth IP Address

**Before editing DNS records, you need your Sabretooth server IP address:**

1. **Log into Sabretooth DirectAdmin**:
   - Go to: `https://sabretooth.hkdns.host:2222`
   - Log in with your credentials

2. **Find your server IP**:
   - Go to "Account Information" or "Server Information"
   - Look for "Shared IP" or "Server IP"
   - It will look like: `123.45.67.89` (example)
   - **Or contact Sabretooth support** - they can give it to you immediately

## 📋 Step 2: Add Domain in Sabretooth (Do This First!)

**Important**: Add the domain in Sabretooth BEFORE updating DNS records:

1. **In Sabretooth DirectAdmin**:
   - Go to "Domain Setup" or "Add Domain"
   - Enter: `teacherscambodia.com`
   - Follow the setup wizard
   - This creates: `/domains/teacherscambodia.com/public_html/`

## 🔧 Step 3: Update A Record in GoDaddy

Once you have your Sabretooth IP address:

1. **In GoDaddy DNS Records** (where you are now):
2. **Edit or replace the A record**:
   - Option A: Edit the "Parked" record and change Data to your Sabretooth IP
   - Option B: Delete both A records and add a new one with your Sabretooth IP
3. **Make sure Name is `@`** (root domain)
4. **Save the changes**

## 🌐 Step 4: Add WWW Record (Optional but Recommended)

1. **Click "Add New Record"**
2. **Type**: A
3. **Name**: `www`
4. **Data/Value**: Same Sabretooth IP address
5. **TTL**: `600 seconds`
6. **Click "Save"**

## ✅ Final DNS Records Should Look Like:

```
Type    Name    Data                TTL
A       @       [Your Sabretooth IP]  600 seconds
A       www     [Your Sabretooth IP]  600 seconds
NS      @       ns61.domaincontrol.com.  (Keep this - can't delete)
```

## ⏱️ Step 5: Wait for DNS Propagation

- DNS changes take 1-24 hours (usually 1-4 hours)
- The domain might still show parked page during this time
- Check propagation: https://www.whatsmydns.net
- Search for `teacherscambodia.com` and check A record

## 🚀 Step 6: Upload Website Files

While waiting for DNS, upload your website files:

1. **In Sabretooth DirectAdmin**:
   - Go to File Manager
   - Navigate to: `/domains/teacherscambodia.com/public_html/`

2. **Upload files**:
   - Upload `index.html` to the root
   - Create `assets` folder
   - Upload all files from `assets/` folder
   - Set permissions: Files (644), Folders (755)

## 🎯 Quick Checklist

- [ ] Got Sabretooth server IP address
- [ ] Added domain in Sabretooth DirectAdmin
- [ ] Updated A record in GoDaddy (changed from "Parked" to Sabretooth IP)
- [ ] Added WWW A record (optional)
- [ ] Uploaded website files to Sabretooth
- [ ] Waited for DNS propagation
- [ ] Tested website

## 🐛 Troubleshooting

### Don't know the Sabretooth IP?
- **Contact Sabretooth support** - they'll give it to you immediately
- Check your hosting welcome email
- Look in DirectAdmin "Account Information"

### Can't edit DNS records?
- Make sure you're logged into the correct GoDaddy account
- Refresh the page and try again
- Contact GoDaddy support if issues persist

### Website still shows parked page?
- Wait longer (DNS can take up to 24 hours)
- Clear browser cache (Ctrl+F5)
- Check DNS propagation: https://www.whatsmydns.net
- Verify A record is pointing to correct IP

---

## 📝 Summary

**Right now, you need to:**
1. Get Sabretooth IP address (contact support or check DirectAdmin)
2. Add domain in Sabretooth DirectAdmin
3. Edit the "Parked" A record in GoDaddy to point to Sabretooth IP
4. Upload website files
5. Wait for DNS to propagate
6. Website goes live!

**The IP `102.249.66.76` might be from a previous setup - you can delete it or replace it with your Sabretooth IP.**







