
        (function() {
        var BsUserAgent = false;
        if( window.navigator.userAgent.toLowerCase().indexOf("applewebkit") > -1)
            BsUserAgent = true;
        var booklistcookie = GetTopCookie("filter_product");
        if(booklistcookie == null  && typeof(localStorage) != 'undefined'  && document.location.href.indexOf("adobe.com") < 0 && BsUserAgent == true){ 
            booklistcookie = getlocalStorage("filter_product");
        }
        var booklisttree;
        function treeInit() {
        booklisttree = new YAHOO.widget.TreeView("booklist1");
        var root = booklisttree.getRoot();            
        
        
        
        var dataObjbooklist1 = 
        { label: "Configuring and Administering Adobe ColdFusion 9",
        href:"http://help.adobe.com/en_US/ColdFusion/9.0/Admin/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "Adobe ColdFusion 9 CFML Reference",
        href:"",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "Developing Adobe ColdFusion 9 Applications",
        href:"http://help.adobe.com/en_US/ColdFusion/9.0/Developing/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "Installing Adobe ColdFusion 9",
        href:"http://help.adobe.com/en_US/ColdFusion/9.0/Installing/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "ColdFusion 9 ActionScript Language Reference",
        href:"http://help.adobe.com/en_US/AS3LCR/ColdFusion_9.0/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "Using Adobe ColdFusion Builder",
        href:"http://help.adobe.com/en_US/ColdFusionBuilder/Using/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "Installing Adobe ColdFusion Builder",
        href:"http://help.adobe.com/en_US/ColdFusionBuilder/Installing/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        if (root.children.length > 0) {
        	updateTOCClass();
        	booklisttree.draw();
        }
        else {
            document.getElementById("booklist1").previousSibling.style.display = "none";
        	hideElement("booklist1");
        }
        }
        
        YAHOO.util.Event.onDOMReady(treeInit);
        })();
            