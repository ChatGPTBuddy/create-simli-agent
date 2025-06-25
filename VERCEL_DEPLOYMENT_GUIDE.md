# Vercel Deployment Guide for Simli Agent

## Issue: Avatar not loading on Vercel deployment

### Root Cause Analysis
The avatar loads on localhost but not on Vercel. This is typically due to:
1. Missing environment variables on Vercel
2. WebRTC/Daily.co connection issues in production
3. HTTPS/security policy differences

### Solution Steps

#### 1. Set Environment Variables on Vercel
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variable:
   - **Name**: `NEXT_PUBLIC_SIMLI_API_KEY`
   - **Value**: `jv5katupjmjgi77lsfic`
   - **Environment**: All (Production, Preview, Development)

#### 2. Redeploy the Application
After setting environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger automatic deployment

#### 3. Check Browser Console
On the deployed Vercel site:
1. Open browser developer tools (F12)
2. Check the **Console** tab for errors
3. Look for the debug messages we added:
   - "API Response" - should show roomUrl and sessionId
   - "VideoBox Debug" - should show track information
   - "Video loaded" / "Audio loaded" - confirms media is working

#### 4. Verify API Response
The console should show:
```
API Response {roomUrl: 'https://...daily.co/...', sessionId: '...'}
```

If this is missing, the environment variable isn't set correctly.

#### 5. Common Issues and Solutions

**Issue**: "Failed to start session" alert
- **Solution**: Environment variable not set on Vercel

**Issue**: API response received but no video
- **Solution**: WebRTC connection blocked, check browser permissions

**Issue**: Daily.co connection errors
- **Solution**: Browser security settings, try different browser

#### 6. Testing Checklist
- [ ] Environment variable set on Vercel
- [ ] Application redeployed after setting env var
- [ ] Browser console shows API response
- [ ] No CORS errors in console
- [ ] Camera/microphone permissions granted
- [ ] Test on different browsers (Chrome, Firefox, Safari)

#### 7. Debug Information
The enhanced VideoBox component now shows debug info in development mode and logs detailed information to help identify issues.
