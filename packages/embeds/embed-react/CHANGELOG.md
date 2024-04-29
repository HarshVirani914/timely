# @timely/embed-react

## 1.3.0

### Minor Changes

- Fix module import of the embed-react package

## 1.2.2

### Patch Changes

- Improve UI instruction layout typings
- Updated dependencies
  - @timely/embed-snippet@1.1.2
  - @timely/embed-core@1.3.2

## 1.2.1

### Patch Changes

- layout type fix as zod-utils can't be used in npm package
- Updated dependencies
  - @timely/embed-snippet@1.1.1
  - @timely/embed-core@1.3.1

## 1.2.0

### Minor Changes

- Supports new booker layout

### Patch Changes

- Updated dependencies
  - @timely/embed-core@1.3.0
  - @timely/embed-snippet@1.1.0

## 1.1.1

### Patch Changes

- Fix the build for embed-react
- Updated dependencies
  - @timely/embed-snippet@1.0.9
  - @timely/embed-core@1.2.1

## 1.1.0

### Minor Changes

- Fix missing types for @timely/embed-react. Also, release support for floatingButton config parameter. Though the support is available using embed.js already, for users using getCalApi the TypeScript types would report that config isn't supported.

### Patch Changes

- Updated dependencies
  - @timely/embed-core@1.2.0
  - @timely/embed-snippet@1.0.8

## 1.0.12

### Patch Changes

- Add changesets. Use prepack instead of prePublish and prepublish only as that works with both yarn and npm
- Updated dependencies
  - @timely/embed-snippet@1.0.7
  - @timely/embed-core@1.1.5
