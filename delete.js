//- Navbar mixins
mixin nav(name, id, style)
- var style = (typeof style === 'undefined') ? "default" : style
nav( role="navigation", class=["navbar", "navbar-" + style] )
    .navbar-header
button.navbar-toggle.collapsed( type="button", data-toggle="collapse", data-target="#" + id, aria-expanded="false", aria-controls="navbar")
span.sr-only Toggle navigation
span.icon-bar
span.icon-bar
span.icon-bar
a.navbar-brand(href="/catalog")= name

    .collapse.navbar-collapse( id=id )
ul.nav.navbar-nav
block

mixin nav_item(href, active)
li(class=active): a( href=href )
block

//- End navbar mixins

+nav("Researcher", "dropdown_menu")
+nav_item( "/catalog/companys" ) Companies
+nav_item( "/catalog/persons" ) Executives
+nav_item( "/catalog/firms" ) Firms
div(class='container-fluid')
div(class='row')
div(class='col-sm-2')
block sidebar
ul(class='nav nav-pills')
li(class='nav-item')
a(class='nav-link')(href='/catalog/firm/create/') New Firm
li
a(class='nav-link two')(href='/catalog/company/create/') New Company
li
a(class='nav-link three')(href='/catalog/person/create/') New Executive

div(class='col-sm-5')

block content