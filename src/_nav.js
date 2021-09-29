export default [
  // {
  //   component: 'CNavItem',
  //   name: 'New Report',
  //   to: '/start-report',
  //   icon: 'cil-speedometer',
  //   badge: {
  //     color: 'primary',
  //     text: 'NEW',
  //   },
  // },
  {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: 'My Examples',
  },
  {
    component: 'CNavItem',
    name: 'Chart',
    to: '/chart',
    icon: 'cil-speedometer'
  }
]
