# Search USCities Mini-project

## Project Summary
This project is a static front end for the USCities Microservice already built and deployed. It is a static front end hosted on GitHub Pages and calls RESTful Microservice API already deployed on Azure App Services. No backend code in this repo, this repo is front end only (HTML/CSS/JS) plus CI/CD workflow that deploys it

No framework(React, Vue, etc.), a build step, r a package manager unless asked explicitly. Plain HTML, CSS and JS only.

## Brief Use Case Description
User enters a ZIP code or city name, presses Enter on the keyboard, or clicks the "Search" button, and the system displays
the matching cities from the USCities Microservice APIs with the base URL of https://vasilekm-uscities-microservices-g5agatf7azf6a4a7.eastus-01.azurewebsites.net/, and two routes are shown below: 

| Method | Route | Description |
|---|---|---|
| GET | `/uscities-search/:zip` | Returns a JSON array of cities matching the subset of the given ZIP code |
| GET | `/uscities-search/:city` | Returns a JSON array of cities matching the subset of the given city name (case-insensitive) |

JSON array response example  (Empty Array if there is no match):

```json
[
  {
    "city": "Cincinnati",
    "state_id": "OH",
    "state_name": "Ohio",
    "county_name": "Hamilton",
    "timezone": "America/New_York",
    "zips": "45255 45219"
  }
]
```

## User Stories
- [ ] As a visitor of the site, I want to search for cities by ZIP code or name, so that I can quickly find details about a location. *(AC-01.1, AC-01.2, AC-01.3, AC-01.4)*
- [ ] As a visitor of the site, I want to see live search suggestions as I type, so that I don't have to finish typing a complete ZIP code or city name before seeing any results. *(AC-01.5, AC-01.6, AC-01.7, AC-01.8)*
- [ ] As a visitor of the site, I want the search feature to protect against common injection and error-handling weaknesses, so that I am protected. *(AC-01.9, AC-01.10, AC-01.11)*

## Acceptance Criteria
- [ ] AC-01.1: When the visitor searches a valid ZIP code, matching cities are displayed in the interface
- [ ] AC-01.2: When the visitor searches a valid city name, matching cities are displayed (case-insensitive) in the interface
- [ ] AC-01.3: Given a query with no matches, a "No cities found" message is displayed to the user
- [ ] AC-01.4: Given a network/server error, an error message is shown, and the page does not crash
- [ ] AC-01.5: When at least 2 characters are typed by the user, when a key is pressed, then cities whose ZIP or name contains the typed text are shown, which is a partial/subset match, not a complete or exact ZIP code or city name
- [ ] AC-01.6: When the visitor keeps typing, the suggestion list only shows the current input, meaning no stale results from an earlier keystroke are shown
- [ ] AC-01.7: When the visitor provides rapid keystrokes, requests are debounced (~300ms after the last keystroke), meaning requests are not fired on every keystroke
- [ ] AC-01.8: When there are no partial matches, a "No cities found" message is shown instead of an empty/stale list
- [ ] AC-01.9: Given the query field, when a search is triggered by a click or keypress, then the input is trimmed and validated before any network call; empty or whitespace-only queries never generate a remote request (Input validation, client-side - defense in depth for OWASP A05:2025 Injection)
- [ ] AC-01.10: Microservice API response fields must be validated before displaying as literal text (Output sanitization - OWASP A05:2025 Injection, covers XSS)
- [ ] AC-01.11: Given any unexpected condition such as malformed JSON, a timeout, a status code not explicitly handled, when it occurs, then the page fails safely by showing an error rather than failing open (showing stale/wrong data silently) or crashing (Robust programming, mishandling of exceptional conditions - OWASP A10:2025)

## Interaction/Sequence Diagram
[![](https://img.plantuml.biz/plantuml/svg/VLJDSjCm4Bvd9k-mamFJpCGawHybXqwPaZ05sZAuxO7fHN4sjYQoP2GvgJamNBdp2hnOduILP3lG7to976btlp_hn5YcRPcBRgVROObL6denjmWtt71wwm4pS6rGTpi57UG9BvYqq9jf9ItAXT-VJH_iNiUdt78qSCuJhQXwpHFqHyzZFqXOcDuLWWei66GwoM3dpMaq6hySGmHXjT-7-n-_O4fpD12kE9oRbzOgsUq0FGuOHCS4O5AV-tBsQKXDgm4K6etPLYSqR5Ntw7PG68IFV8rWoZH5OxcIfe5mq48u2X2KX1LMlk7ZkLTLWS0WoPWc_UZ_7Iy54tzXkV_v6tRz4TCF7MRJflujpbKf4uJlUwDHte9uLH-KYipGFCqigAKlE4kbqZHILi1bj1H-Zx0LH071Pim2DxTIAX1AfWHeIVHjXY2O9QQEYh5QhR0PTKYZo4fdp1RMbUOvl80r4tn1TJIgA6rJyReVFApVl4YO5xOQRZ8AZobOWf6IeeAl9UfgIvcQE-qcSA48CcqQvx-qjID-se0uoyYtUrX-JFcPmBlf5GnBa_Y8HI4-myatNe0p-eajPy9pQiOi9z4s14ULX1nSM17cocPWwI3fPo2wbQLaCib8zmNXJl4EcD385XNbfoYKjWOQrtDcamoDKzDDtCeqXc6zscrN1-tgq8jO5vDbfLnuuveGXMxkEO-zZWxyxcW4bny6y3w-l02cDQiShS1-Mx0rzQPniutBagDO69ZZqcLAKmnSWcl0e_w_JLhtFeTprAKKH7rdMGe1WfEPX5Wy-Apg9jxWq7YlPNtaMLDKMzN-mp94mjDy1bUFOXNO1mLxZqRljwF7up0RoNoz6e3bEL841ev2pWJfaNkpWr1F0ZiWOCEca5Ppjl1MF2NzZ741XYtHnPjqAb2sEe-VqtcgjKD3zmvBiP6ARco13kM6xk0Ko4y69bER-axqNtBzEP_GBztjVm00)](https://editor.plantuml.com/uml/VLJDSjCm4Bvd9k-mamFJpCGawHybXqwPaZ05sZAuxO7fHN4sjYQoP2GvgJamNBdp2hnOduILP3lG7to976btlp_hn5YcRPcBRgVROObL6denjmWtt71wwm4pS6rGTpi57UG9BvYqq9jf9ItAXT-VJH_iNiUdt78qSCuJhQXwpHFqHyzZFqXOcDuLWWei66GwoM3dpMaq6hySGmHXjT-7-n-_O4fpD12kE9oRbzOgsUq0FGuOHCS4O5AV-tBsQKXDgm4K6etPLYSqR5Ntw7PG68IFV8rWoZH5OxcIfe5mq48u2X2KX1LMlk7ZkLTLWS0WoPWc_UZ_7Iy54tzXkV_v6tRz4TCF7MRJflujpbKf4uJlUwDHte9uLH-KYipGFCqigAKlE4kbqZHILi1bj1H-Zx0LH071Pim2DxTIAX1AfWHeIVHjXY2O9QQEYh5QhR0PTKYZo4fdp1RMbUOvl80r4tn1TJIgA6rJyReVFApVl4YO5xOQRZ8AZobOWf6IeeAl9UfgIvcQE-qcSA48CcqQvx-qjID-se0uoyYtUrX-JFcPmBlf5GnBa_Y8HI4-myatNe0p-eajPy9pQiOi9z4s14ULX1nSM17cocPWwI3fPo2wbQLaCib8zmNXJl4EcD385XNbfoYKjWOQrtDcamoDKzDDtCeqXc6zscrN1-tgq8jO5vDbfLnuuveGXMxkEO-zZWxyxcW4bny6y3w-l02cDQiShS1-Mx0rzQPniutBagDO69ZZqcLAKmnSWcl0e_w_JLhtFeTprAKKH7rdMGe1WfEPX5Wy-Apg9jxWq7YlPNtaMLDKMzN-mp94mjDy1bUFOXNO1mLxZqRljwF7up0RoNoz6e3bEL841ev2pWJfaNkpWr1F0ZiWOCEca5Ppjl1MF2NzZ741XYtHnPjqAb2sEe-VqtcgjKD3zmvBiP6ARco13kM6xk0Ko4y69bER-axqNtBzEP_GBztjVm00)

## Interaction/Sequence Diagram PlantUML Code

```
@startuml

actor "Site Visitor" as User
participant "Frontend" as FE
participant "USCities Microservice" as MS

alt Explicit search (AC-01.1 - AC-01.4) — Enter or Search button
    User -> FE: Enter ZIP/city, press Enter or click Search
else Live suggestions (AC-01.5 - AC-01.8) — on keypress
    User -> FE: Type a character (partial ZIP/city, ≥ 2 chars)
    FE -> FE: Debounce ~300ms (AC-01.7)
    note right of FE: Ignore any in-flight response that is\nno longer for the latest keystroke (AC-01.6)
end

FE -> FE: Trim & validate input (AC-01.9)
alt AC-01.9 — empty/whitespace-only query
    FE --> User: No request sent
else valid, non-empty query
    FE -> MS: GET /uscities-search/:zip  or  /uscities-search/:city
    note right of FE: Same two routes serve both triggers -\nunanchored regex already supports partial matches

    alt AC-01.1 / AC-01.2 / AC-01.5 / AC-01.6 — matches found for ZIP/city
        MS --> FE: 200 OK, JSON array of cities
        FE -> FE: Validate response fields before render (AC-01.10)
        FE --> User: Render results (full list or live suggestions)
    else AC-01.3 / AC-01.8 — no matches
        MS --> FE: 200 OK, empty array
        FE --> User: "No cities found"
    else AC-01.4 / AC-01.11 — network, timeout, or malformed response
        MS --> FE: 500 / timeout / bad JSON
        FE -> FE: Fail safe, not open (AC-01.11)
        FE --> User: Error message — no stale or wrong data shown
    end
end

@enduml
```

## File Layout for the project

```
index.html # search UI HTML, no JS follwoing CSP
app.js # main JS code
styles.css # CSS file
.github/workflows/static.yml # CI/CD - deploys to GitHub Pages on push to main
*.md # this file
```

## Deployment

Pusing t0 'main' automatically deploys via 'github/workflows/static.yml' - no manual deploy step. Should be deployed on: https://vasilevk33.github.io/uscities-search/

## Coding Conventions
- Purse JS, fetch() for microservice API calls - no external libraries
- handle every fetch() with a try/catch or .catch()
- validate/trim input on client before calling fetch(), reject empty quiries
- use async/await over .then()
- keep functions small and named for what they do 'searchcities(query, mode), renderresults(data)
- no inline event handlers in HTML 'onclick=' - attach listerners in the script block
- stoey 2 (live suggestions): attach an input listener, not keydown/keyup, so pate and IME input are covered too. debounce with setTimeout/cleartimeout (~300ms), and cancel or ignore and in-flight response thats no longer for the latest query (AC6)

## Definition of Done

task is done when all AC pass against the **live deployed** github pages site, not just ocalhost and the CI/cd pipeline is green