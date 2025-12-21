# Quick Fix Checklist - Connection Timeout

## 🚨 "ERR_CONNECTION_TIMED_OUT" - Quick Fix

### ✅ Must-Do Steps (In Order)

#### 1. Add Domain in Sabretooth (CRITICAL!)
- [ ] Log into DirectAdmin: `https://sabretooth.hkdns.host:2222`
- [ ] Go to "Domain Setup" or "Add Domain"
- [ ] Add: `teacherscambodia.com`
- [ ] Verify directory created: `/domains/teacherscambodia.com/public_html/`

#### 2. Get Sabretooth IP Address
- [ ] Check DirectAdmin "Account Information"
- [ ] Or contact Sabretooth support
- [ ] Note the IP address (e.g., `123.45.67.89`)

#### 3. Update DNS in GoDaddy
- [ ] Go to GoDaddy DNS Records
- [ ] Edit A record (change "Parked" to Sabretooth IP)
- [ ] Name: `@`
- [ ] Value: Your Sabretooth IP address
- [ ] Save changes

#### 4. Upload Website Files
- [ ] Go to DirectAdmin File Manager
- [ ] Navigate to: `/domains/teacherscambodia.com/public_html/`
- [ ] Upload `index.html`
- [ ] Create `assets/` folder
- [ ] Upload all files from `assets/` folder
- [ ] Set permissions: Files (644), Folders (755)

#### 5. Wait for DNS
- [ ] Wait 1-4 hours (can take up to 24 hours)
- [ ] Check DNS propagation: https://www.whatsmydns.net
- [ ] Clear browser cache (Ctrl+F5)

## 🔍 Quick Tests

### Test DNS:
```cmd
nslookup teacherscambodia.com
```
Should show your Sabretooth IP

### Test Propagation:
Visit: https://www.whatsmydns.net
Search: `teacherscambodia.com`
Record type: A
Should show your Sabretooth IP worldwide

## 📞 Still Not Working?

1. **Verify domain is added in Sabretooth** (most common issue!)
2. **Contact Sabretooth support** - ask them to verify:
   - Domain is properly configured
   - Server is accessible
   - IP address is correct
3. **Verify A record in GoDaddy** - make sure it's not "Parked"

---

**Most Common Issue**: Domain not added in Sabretooth DirectAdmin. Add it first!







