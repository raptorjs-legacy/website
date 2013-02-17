define(
    "components.nav.NavItem.NavItemTag",
    ['raptor'],
    function(raptor, raptor) {
        var NavItemTag = function() {
            
        };
        
        NavItemTag.prototype = {
            process: function(input, context) {
                var liClassParts = [];
                
                var nav = input.nav,
                    activeItem,
                    type;
                if (nav) {
                    activeItem = nav.activeItem;
                    type = nav.type
                }
                
                if (input.itemId && activeItem && activeItem === input.itemId) {
                    input.active = true;
                }
                
                if (input.active) {
                    liClassParts.push("active nav-item-active");
                }
                
                var isDropdownMenu = input.type === 'dropdown-menu';
                
                if (isDropdownMenu) {
                    liClassParts.push("dropdown");
                }

                input.attrs = {};
                
                if (liClassParts.length) {
                    input.attrs["class"] = liClassParts.join(" ");
                }
                
                if (input.dynamicAttributes) {
                    raptor.extend(input.attrs, input.dynamicAttributes);
                }
                
                input.anchorAttrs = {};
                
                if (isDropdownMenu) {
                    nav = input;
                    nav.activeItem = activeItem; //Pass along the active item to the sub-nav
                    
                    input.anchorAttrs["href"] = "";
                    input.anchorAttrs["data-toggle"] = "dropdown";
                    input.anchorAttrs["class"] = "dropdown-toggle";
                }
                else {
                    if (input.toggle) {
                        input.anchorAttrs["href"] = "#";
                        input.anchorAttrs["data-toggle"] = (type === 'pills' || type === 'pill' ? 'pill' : 'tab');
                    }
                    else {
                        input.anchorAttrs["href"] = input.href ? input.href : "#";
                    }    
                }
                
                require('raptor/templating').render('components/nav/NavItem', {
                        nav: nav,
                        navItem: input,
                        isDropdownMenu: isDropdownMenu
                    },
                    context);
            }
        };
        
        return NavItemTag;
    });