
# Testing Setup Instructions

## Required Package.json Scripts

Add the following scripts to your package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## Environment Variables for Vercel

Set these environment variables in your Vercel project settings:

- `VERCEL_TOKEN`: Your Vercel token
- `ORG_ID`: Your Vercel organization ID  
- `PROJECT_ID`: Your Vercel project ID

## GitHub Branch Protection

In your GitHub repository settings:

1. Go to Settings > Branches
2. Add a branch protection rule for `main` or `master`
3. Enable:
   - Require a pull request before merging
   - Require status checks to pass before merging
   - Include the CI workflow checks

## Running Tests

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Run Storybook
npm run storybook
```

## Test Coverage Goals

- ✅ 4+ Reducer tests (threadsSlice, authSlice, usersSlice, leaderboardSlice)
- ✅ 8+ Thunk function tests (across all slices)
- ✅ 5+ React component tests (ThreadCard, Navbar, SearchFilters, HeroSection, ThreadsList)
- ✅ 3+ E2E tests (login, registration, create-thread)
- ✅ 2+ Storybook stories (ThreadCard, Button)
- ✅ Zustand integration (UI state and user preferences)
- ✅ CI/CD pipeline with GitHub Actions and Vercel
