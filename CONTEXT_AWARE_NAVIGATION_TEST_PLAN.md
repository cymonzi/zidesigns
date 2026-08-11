# Context-Aware Navigation Test Plan

## Overview
This document outlines test cases for the context-aware back navigation system implemented across the start-project flow.

---

## Implementation Summary

### Key Changes
1. **Service Selection Page** (`/start-project`)
   - Reads `from` URL parameter
   - Displays "Back to Home" or "Back to Get Started" based on entry point
   - Passes service name to package pages via `from` parameter

2. **Package Pages** (graphic-design, website, mobile-app, saas)
   - Read `from` URL parameter to get service name
   - Display "Back to [Service Name]" (e.g., "Back to Graphic & Brand Design")
   - Pass `fromPackage` parameter when navigating to contact step

3. **Contact Step** (`/start-project?phase=2`)
   - Displays "Back to Packages" label
   - Uses `fromPackage` parameter to route to correct package page
   - Falls back to category-based routing if parameter missing

4. **Confirmation Screen** (`/start-project?phase=3`)
   - No back button
   - "Request another project" button resets and returns to `/start-project`

---

## Test Cases

### Test Case 1: Full Journey from Homepage
**Steps:**
1. Navigate to `/start-project` (or homepage → Get Started)
2. Verify back button shows: **"Back to Home"**
3. Select "Graphic & Brand Design" → Continue
4. On `/graphic-design-packages`, verify back button shows: **"Back to Graphic & Brand Design"**
5. Select services → Continue
6. On contact form, verify back button shows: **"Back to Packages"**
7. Click "Back to Packages"
8. Verify returns to `/graphic-design-packages`

**Expected URL Flow:**
```
/ → /start-project → /graphic-design-packages?from=Graphic%20%26%20Brand%20Design → 
/start-project?service=X&price=Y&category=Design&phase=2&fromPackage=graphic-design
```

**Pass Criteria:**
- ✓ All back button labels are contextually correct
- ✓ Back navigation returns to expected pages
- ✓ No browser history used; all routing is explicit

---

### Test Case 2: Website Development Path
**Steps:**
1. Navigate to `/start-project`
2. Select "Website Development" → Continue
3. On `/website-packages`, verify back button shows: **"Back to Website Development"**
4. Select "Business Website" → Continue
5. On contact form, verify back button shows: **"Back to Packages"**
6. Click "Back to Packages"
7. Verify returns to `/website-packages`

**Expected URL Flow:**
```
/start-project → /website-packages?from=Website%20Development → 
/start-project?service=Business%20Website&price=UGX%201,500,000&category=Development&phase=2&fromPackage=website
```

**Pass Criteria:**
- ✓ Back button on website-packages shows "Back to Website Development"
- ✓ Back from contact returns to website-packages

---

### Test Case 3: Mobile App Development Path
**Steps:**
1. Navigate to `/start-project`
2. Select "Mobile App Development" → Continue
3. On `/mobile-app-packages`, verify back button shows: **"Back to Mobile App Development"**
4. Select package → Continue
5. On contact form, verify back button shows: **"Back to Packages"**
6. Click "Back to Packages"
7. Verify returns to `/mobile-app-packages`

**Expected URL Flow:**
```
/start-project → /mobile-app-packages?from=Mobile%20App%20Development → 
/start-project?service=X&price=Y&category=Development&phase=2&fromPackage=mobile-app
```

---

### Test Case 4: Web Apps & SaaS Path
**Steps:**
1. Navigate to `/start-project`
2. Select "Web Apps & SaaS" → Continue
3. On `/saas-packages`, verify back button shows: **"Back to Web Apps & SaaS"**
4. Select package → Continue
5. On contact form, verify back button shows: **"Back to Packages"**
6. Click "Back to Packages"
7. Verify returns to `/saas-packages`

**Expected URL Flow:**
```
/start-project → /saas-packages?from=Web%20Apps%20%26%20SaaS → 
/start-project?service=X&price=Y&category=Development&phase=2&fromPackage=saas
```

---

### Test Case 5: Direct Entry to Package Page (No Context)
**Steps:**
1. Navigate directly to `/graphic-design-packages` (no `from` parameter)
2. Verify back button shows: **"Back to Services"** (fallback)
3. Select services → Continue
4. On contact form, verify back button shows: **"Back to Packages"**
5. Click "Back to Packages"
6. Verify returns to `/graphic-design-packages`

**Expected Behavior:**
- When `from` parameter is missing, fallback to "Services"
- Navigation still works correctly using `fromPackage` parameter

---

### Test Case 6: Deep Link to Contact Form
**Steps:**
1. Navigate directly to:
   ```
   /start-project?service=Business%20Website&price=UGX%201,500,000&category=Development&phase=2&fromPackage=website
   ```
2. Verify contact form loads with pre-filled service information
3. Verify back button shows: **"Back to Packages"**
4. Click "Back to Packages"
5. Verify navigates to `/website-packages`

**Expected Behavior:**
- Contact form accepts direct links with pre-selected packages
- Back button still routes correctly using `fromPackage` parameter

---

### Test Case 7: Confirmation Screen Navigation
**Steps:**
1. Complete full flow and submit contact form
2. On confirmation screen (phase=3), verify:
   - **No back button is visible**
   - "Request another project" button is visible
   - "Download summary" button is visible
3. Click "Request another project"
4. Verify navigates to `/start-project` with clean state

**Expected Behavior:**
- No way to go back from confirmation
- "Request another project" resets all form state
- Returns to clean `/start-project` page

---

### Test Case 8: Browser Back Button Behavior
**Steps:**
1. Complete flow: Service → Package → Contact
2. Use browser back button at each step
3. Verify browser history is intact but not relied upon for UI navigation

**Expected Behavior:**
- Browser back button works (browser-level navigation)
- All UI back buttons use explicit routing (not `router.back()`)
- User can still use browser back if desired

---

## Edge Cases

### Edge Case 1: Missing Parameters
**Scenario:** User arrives at contact form without `fromPackage` parameter

**Expected Behavior:**
- Fallback to category-based routing
- If category is "Design" → route to `/graphic-design-packages`
- If category is "Development" but can't determine which → fallback to service selection

**Test:**
```
Navigate to: /start-project?service=Test&price=100&category=Design&phase=2
(missing fromPackage)

Back button should route to: /graphic-design-packages
```

---

### Edge Case 2: Invalid Package Type
**Scenario:** `fromPackage` parameter has unexpected value

**Expected Behavior:**
- Fallback logic activates
- Attempts category-based routing
- Ultimate fallback to service selection (phase 1)

---

### Edge Case 3: URL Parameter Encoding
**Scenario:** Service names with special characters

**Expected Behavior:**
- All service names properly URL encoded
- "Web Apps & SaaS" becomes "Web%20Apps%20%26%20SaaS"
- Decoded correctly when displaying back button label

**Test:**
```
URL: /saas-packages?from=Web%20Apps%20%26%20SaaS
Back button should display: "Back to Web Apps & SaaS"
```

---

## Visual Verification Checklist

For each page, verify the back button:

- [ ] **Service Selection** (`/start-project`)
  - Label: "Back to Home" or "Back to Get Started"
  - Destination: `/` (homepage)

- [ ] **Graphic Design Packages** (`/graphic-design-packages?from=X`)
  - Label: "Back to X" (where X is the service name from URL)
  - Destination: `/start-project`

- [ ] **Website Packages** (`/website-packages?from=X`)
  - Label: "Back to X"
  - Destination: `/start-project`

- [ ] **Mobile App Packages** (`/mobile-app-packages?from=X`)
  - Label: "Back to X"
  - Destination: `/start-project`

- [ ] **SaaS Packages** (`/saas-packages?from=X`)
  - Label: "Back to X"
  - Destination: `/start-project`

- [ ] **Contact Form** (`/start-project?phase=2&fromPackage=X`)
  - Label: "Back to Packages"
  - Destination: Depends on `fromPackage` parameter

- [ ] **Confirmation** (`/start-project?phase=3`)
  - No back button
  - "Request another project" button visible

---

## Accessibility Checks

- [ ] All back buttons have clear, descriptive text (not just "Back")
- [ ] Back button labels are screen-reader friendly
- [ ] Keyboard navigation works (Tab to back button, Enter to activate)
- [ ] Focus states are visible on back buttons
- [ ] No reliance on visual-only cues

---

## Performance Considerations

- [ ] No unnecessary re-renders when URL parameters change
- [ ] `useSearchParams` properly used with `useEffect` dependencies
- [ ] No infinite loops in routing logic
- [ ] State resets cleanly when starting new request

---

## Regression Tests

After implementation, verify these scenarios still work:

1. **Auto-selection from URL:**
   - Arriving at package page with `service` parameter pre-selects package
   
2. **Price display:**
   - Contact form shows correct price from URL parameter

3. **Category mapping:**
   - Services correctly map to categories (Design/Branding/Development)

4. **Form submission:**
   - All form data submits correctly
   - Email notifications still work
   - PDF download still works

5. **Phase navigation:**
   - Tab navigation between phases works
   - Can't access phase 3 without completing previous phases

---

## Manual Testing Checklist

### Desktop Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge

### Mobile Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify back button labels are readable on small screens

### Responsive Design
- [ ] Back buttons visible at all breakpoints
- [ ] Labels don't overflow or wrap awkwardly
- [ ] Touch targets are adequately sized (44x44px minimum)

---

## Known Limitations

1. **Browser History:**
   - Browser back button will still use history stack
   - UI back buttons use explicit routing (better UX)
   - Both approaches coexist without conflict

2. **Bookmarking:**
   - Users can bookmark any step in the flow
   - Deep links work with pre-filled information
   - Context information (from/fromPackage) preserved in URLs

3. **Multiple Tabs:**
   - Each tab maintains its own state
   - URL parameters ensure consistency

---

## Success Criteria

Implementation is considered successful when:

✅ All back buttons have explicit, contextual labels
✅ No use of `router.back()` for primary navigation
✅ Users always know where "back" will take them
✅ Deep linking works correctly
✅ Fallback logic handles missing parameters gracefully
✅ Confirmation screen has no back button
✅ "Request another project" resets state cleanly
✅ All test cases pass
✅ No accessibility issues
✅ No regressions in existing functionality

---

## Quick Test Commands

### Test URL Examples
```bash
# Service selection (default)
http://localhost:3000/start-project

# Graphic design packages with context
http://localhost:3000/graphic-design-packages?from=Graphic%20%26%20Brand%20Design

# Website packages with context
http://localhost:3000/website-packages?from=Website%20Development

# Contact form with pre-filled data
http://localhost:3000/start-project?service=Business%20Website&price=UGX%201,500,000&category=Development&phase=2&fromPackage=website

# Confirmation screen
http://localhost:3000/start-project?phase=3
```

---

## Troubleshooting

### Issue: Back button shows "Back to Services" instead of service name
**Cause:** `from` parameter missing or not passed correctly
**Fix:** Verify service selection page passes `from` parameter when navigating to package pages

### Issue: Back from contact goes to wrong package page
**Cause:** `fromPackage` parameter missing or incorrect
**Fix:** Verify all package pages pass correct `fromPackage` value (graphic-design, website, mobile-app, saas)

### Issue: Back button label has encoding issues
**Cause:** Special characters not properly encoded/decoded
**Fix:** Use `encodeURIComponent()` when setting URL params, native decoding when reading `searchParams.get()`

---

## Future Enhancements

Potential improvements for future iterations:

1. **Breadcrumb Navigation:**
   - Add visual breadcrumbs: "Home > Services > Packages > Contact"
   - Make breadcrumbs clickable for quick navigation

2. **Progress Persistence:**
   - Save progress to localStorage
   - Allow users to resume incomplete requests

3. **URL State Sync:**
   - Sync all form fields to URL
   - Make every state fully shareable via URL

4. **Analytics:**
   - Track which paths users take most frequently
   - Identify drop-off points
   - Measure back button usage

5. **A/B Testing:**
   - Test different button labels
   - Measure completion rates with explicit vs. generic labels

---

## Documentation Updates

After testing is complete, update:

- [ ] Main README with navigation flow diagram
- [ ] Developer docs with URL parameter specifications
- [ ] User guide with expected navigation behavior
- [ ] API documentation if relevant
