# Budget Tracker

A simple tool created to track how I spend my money.

---
## Setup

*[TODO: Release a v1 build](#todo)*

**File Structure**
```
Budget Tracker          // Parent folder containing both the repo and the data
├── BudgetTracker       // This repo
│   ├── public
│   └── src
│       ├── Components  // Reusable React components
│       ├── Pages       // Full pages
│       ├── Types       // Custom objects and types
│       └── Util        // Reusable utility functions
│
└── data                // Folder containing all the budget data
    ├── 2022            // Each year requires its own folder within data
    │   ├── 0122.csv    // Each month requires its own csv file: <mmyy>.csv
    │   └── ...
    └── 2023
    │   └── ...
    └── ... 

```

**Table Structure**
| Date | Title | Price | Category | Notes |
| - | - | - | - | - |
| Date `string` in dd/mm/yyyy format | `string` | `string` with currency symbol prefix | `string` | `string` |

---
## Development
**Prerequisites**
- [Node](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)

**Getting Started**
1) Clone this repo
2) Setup the data folder structure. Refer to the [Folder Strucure](#folder-structure) section.
3) Install the required yarn packages via Yarn:
    `yarn`
4) Run the server, and electron app together:
   `yarn electron:serve`

---
## TODO
**High Priority**
- [ ] Read the file structure from the `data` folder
- [ ] Add, delete and edit new and existing data
- [ ] Validate data entry
  - No commas!
- [ ] Handle empty cells
  - Current solution is to have a dash (`-`) placeholder.
- [ ] Create a runnable build of the project

**Medium Priority**
- [ ] Renamed the csv headers
  - `Date` ✓
  - `Title` ➡ `Item`
  - `Price` ✓
  - `Category` ✓
  - `Notes` ➡ `Location`
  - \+ `Comments`
- [ ] Move the data folder better location
  - `/Users/<user>/Documents/BudgetTrackerData` on macOS, for example
- [ ] Reduce required setup
  - Generate folder structure on install
  - Generate new files as needed


**Low Priority**
- [ ] Configurable Dashboard
  - [Cloudscape Design Pattern](https://cloudscape.design/patterns/general/service-dashboard/configurable-dashboard/)
- [ ] More complex data visualization
  - [D3js](https://d3js.org/)
  - Spreadsheet-style scripting for creating graphs
- [ ] Save user customization
  - App state

---

## Frameworks Used

**Project setup**
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org)
- [Electron](https://www.electronjs.org/)

**Design**
- [Cloudscape](https://cloudscape.design)