webpackJsonp([1],{NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("Tqaz"),r=(e("sWs5"),e("7+uW")),i={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]},s=e("VU/8")(null,i,!1,null,null,null).exports,n=e("/ocq"),l=e("mtWM"),c=e.n(l),u={data:function(){return{isbn:""}},methods:{deleteBook:function(){var t=this,a="http://127.0.0.1:5000/book/"+this.isbn;c.a.delete(a).then(function(a){console.log("BOOK DELETED"),t.isbn="",alert("Book deleted from db"),t.$refs["modal-1"].hide()}).catch(function(t){console.log(t)})}}},d={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",{attrs:{href:"#"}},[t._v("NavBar")])],1),t._v(" "),e("b-container",[e("div",{staticClass:"row d-flex justify-content-center"},[e("div",{staticClass:"col-sm-4"},[e("div",{staticClass:"form-control bg-light",staticStyle:{"margin-top":"100px"}},[e("div",{staticClass:"form-label-group"},[e("div",{staticClass:"row justify-content-center"},[e("h4",[t._v("Borrar libro")])]),t._v(" "),e("b-row",[e("b-container",[e("b-row",{attrs:{"align-h":"between"}},[e("b-col",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.isbn,expression:"isbn"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"isbn",placeholder:"ISBN",required:"",autofocus:"",type:"number"},domProps:{value:t.isbn},on:{input:function(a){a.target.composing||(t.isbn=a.target.value)}}})])],1),t._v(" "),e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-1",modifiers:{"modal-1":!0}}],staticStyle:{"margin-top":"10px"},attrs:{variant:"primary"}},[t._v("Borrar libro")])],1)],1)],1)])]),t._v(" "),e("b-modal",{ref:"modal-1",attrs:{id:"modal-1","hide-footer":"",title:"Borrar Libro"}},[e("p",{staticClass:"my-4"},[t._v("¿Estas seguro de borrar el libro con el ISBN: "+t._s(t.isbn)+"?")]),t._v(" "),e("b-row",{attrs:{"align-h":"center"}},[e("b-col",{attrs:{cols:"2"}},[e("b-button",{on:{click:function(a){return t.deleteBook()}}},[t._v(" OK ")])],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-button",{on:{click:function(a){return t.$bvModal.hide("modal-1")}}},[t._v(" NO ")])],1)],1)],1),t._v(" "),e("div",{staticClass:"col-sm-6"},[e("b-container",{staticStyle:{"margin-top":"100px"}},[e("img",{attrs:{src:"https://placehold.it/240x340/"}})])],1)],1)])],1)},staticRenderFns:[]},v=e("VU/8")(u,d,!1,null,null,null).exports,p={data:function(){return{best_sellers:[],new_releases:[],cartItems:[],see_cart:!1,items:0,price:0}},created:function(){this.load_new_releases()},methods:{gotobook:function(t){this.$router.push({path:"/book",query:{bk:t.isbn}})},load_best_sellers:function(){var t=this;c.a.get("http://127.0.0.1:5000/books",{numBooks:2,param:"isbn",order:"asc"}).then(function(a){t.best_sellers=a.data}).catch(function(t){console.error(t)})},load_new_releases:function(){var t=this;c.a.get("http://127.0.0.1:5000/books",{numBooks:2,param:"isbn",order:"asc"}).then(function(a){t.new_releases=a.data.books}).catch(function(t){console.error(t)})},add_cart:function(t){var a,e=!1;for(a=0;a<this.cartItems.length;a++)t.isbn===this.cartItems[a].book.isbn&&(this.cartItems[a].quantity+=1,e=!0);e||this.cartItems.push({book:t,quantity:1})},show_cart:function(){this.see_cart=!this.see_cart},total_amount:function(t,a){return t*a},calculate_total_price:function(){var t,a=0;for(t=0;t<this.cartItems.length;t++)a+=this.total_amount(this.cartItems[t].book.precio,this.cartItems[t].quantity);return this.price=a,this.price},getURL:function(t){return t.url_imagen},logIn:function(){this.$router.push({path:"/userlogin"})},return_book:function(t){var a=this.cartItems.indexOf(t);this.items-=1,-1!==a&&this.cartItems.splice(a,1)}}},m={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",[t._v(" NavBar")]),t._v(" "),e("b-nav-form",[e("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"md",placeholder:"Search"}}),t._v(" "),e("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"md",type:"submit"}},[t._v("Search")])],1),t._v(" "),e("b-navbar-nav",{staticClass:"ml-auto"},[e("ul",{staticClass:"navbar-nav nav-fill w-100",attrs:{id:"menu-main-nav"}},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link"},[e("b-icon",{attrs:{icon:"bookmark-heart","font-scale":"2.5"}})],1)]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link"},[e("b-icon",{attrs:{title:"Strikethrough",icon:"basket","font-scale":"2.5"},on:{click:function(a){t.show_cart(),t.calculate_total_price()}}})],1)]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link"},[e("b-button",{attrs:{variant:"danger"},on:{click:function(a){return t.logIn()}}},[t._v("Log In")])],1)])])])],1)],1),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),!1===t.see_cart?e("b-container",[e("img",{attrs:{src:"https://placehold.it/1100x300/?text="+t.picturestock,alt:""}})]):t._e(),t._v(" "),e("br"),t._v(" "),!1===t.see_cart?e("div",{staticClass:"container"},[e("h3",[t._v(" Best sellers ")]),t._v(" "),e("b-row",t._l(t.best_sellers,function(a){return e("b-col",{key:a.isbn},[e("br"),t._v(" "),e("img",{staticStyle:{height:"209px",width:"140px"},attrs:{src:t.getURL(a),alt:""},on:{click:function(e){return t.gotobook(a)}}}),t._v(" "),e("h6",{on:{click:function(e){return t.gotobook(a)}}},[t._v(t._s(a.titulo))]),t._v(" "),e("h5",[t._v(t._s(a.autor))]),t._v(" "),e("h6",[t._v("Valoració")]),t._v(" "),e("h6",[t._v(t._s(a.precio))]),t._v(" "),e("b-button",{attrs:{variant:"danger"},on:{click:function(e){return t.add_cart(a)}}},[t._v("Add to cart")])],1)}),1)],1):t._e(),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),!1===t.see_cart?e("div",{staticClass:"container"},[e("h3",[t._v(" New releases ")]),t._v(" "),e("b-row",t._l(t.new_releases,function(a){return e("b-col",{key:a.isbn},[e("br"),t._v(" "),e("img",{staticStyle:{height:"209px",width:"140px"},attrs:{src:t.getURL(a),alt:""},on:{click:function(e){return t.gotobook(a)}}}),t._v(" "),e("h6",{on:{click:function(e){return t.gotobook(a)}}},[t._v("  "+t._s(a.titulo))]),t._v(" "),e("h5",[t._v(t._s(a.autor))]),t._v(" "),e("h6",[t._v("Valoració")]),t._v(" "),e("h6",[t._v(t._s(a.precio))]),t._v(" "),e("b-button",{attrs:{variant:"danger"},on:{click:function(e){return t.add_cart(a)}}},[t._v("Add to cart")])],1)}),1)],1):t._e(),t._v(" "),!0===t.see_cart?e("b-container",[e("h2",[t._v(" CISTELLA "+t._s(this.cartItems.length)+" PRODUCTES ")])]):t._e(),t._v(" "),e("br"),t._v(" "),!0===t.see_cart?e("b-container",[e("b-row",[e("b-col",{attrs:{cols:"8"}},[e("b-container",{staticStyle:{padding:"35px"},attrs:{fluid:""}},t._l(t.cartItems,function(a){return e("b-row",{key:a.book.isbn,staticClass:"border bg-light",staticStyle:{padding:"35px","margin-bottom":"10px"}},[e("b-col",[e("img",{staticStyle:{height:"109px",width:"70px"},attrs:{src:t.getURL(a.book),alt:""},on:{click:function(e){return t.gotobook(a.book)}}})]),t._v(" "),e("b-col",[e("h6",{on:{click:function(a){return t.gotobook(t.book)}}},[t._v(" "+t._s(a.book.titulo))]),t._v(" "),e("h5",[t._v(" "+t._s(a.book.autor))])]),t._v(" "),e("b-col",[e("b-row",[e("h6",[t._v(t._s(t.total_amount(a.book.precio,a.quantity))+" $")])]),t._v(" "),e("br"),t._v(" "),e("b-row",[e("b-form-spinbutton",{staticStyle:{width:"45%"},attrs:{id:"sb-inline",min:"1"},on:{click:function(e){t.total_amount(a.book.precio,a.quantity),t.calculate_total_price()}},model:{value:a.quantity,callback:function(e){t.$set(a,"quantity",e)},expression:"item.quantity"}})],1)],1),t._v(" "),e("b-col",[e("b-button",{attrs:{variant:"danger"},on:{click:function(e){return t.return_book(a)}}},[t._v("Eliminar")])],1),t._v(" "),e("hr")],1)}),1)],1),t._v(" "),e("b-col",[e("b-container",{staticClass:"border bg-light",staticStyle:{padding:"15px"},attrs:{fluid:""}},[e("p",[t._v(" Tens un codi de descompte? ")]),t._v(" "),e("b-nav-form",[e("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Introdueix el teu codi descompte"}}),t._v(" "),e("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"sm",type:"submit"}},[t._v("Validar")])],1)],1),t._v(" "),e("b-container",{staticClass:"border bg-light",staticStyle:{padding:"15px","margin-top":"10px"},attrs:{fluid:""}},[e("br"),t._v(" "),e("h5",[t._v(" Resum ")]),t._v(" "),e("br"),t._v(" "),e("h6",[t._v(" "+t._s(t.calculate_total_price())+"$ ")]),t._v(" "),e("hr"),t._v(" "),e("h6",[t._v(" Despeses enviament : Gratuït")]),t._v(" "),e("hr"),t._v(" "),e("h5",[t._v(" Total : "+t._s(t.calculate_total_price())+" $ ")]),t._v(" "),e("br"),t._v(" "),e("b-button",{staticStyle:{width:"100%"},attrs:{variant:"danger"}},[t._v("Finalitzar compra")]),e("br"),e("br")],1)],1)],1)],1):t._e(),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("footer",{staticStyle:{height:"auto","background-color":"black"}},[a("h5",{staticStyle:{color:"white",padding:"20px",margin:"0","text-align":"center",bottom:"0"}},[this._v("Contact, bla, bla")])])}]},b=e("VU/8")(p,m,!1,null,null,null).exports,_={data:function(){return{single_book:{},see_cart:!1,cartItems:[],price:0}},created:function(){this.load_book()},methods:{load_book:function(){var t=this,a="http://127.0.0.1:5000/book/"+this.$route.query.bk;c.a.get(a).then(function(a){t.single_book=a.data.book}).catch(function(t){console.error(t)})},getURL:function(){return this.single_book.url_imagen},show_cart:function(){this.see_cart=!this.see_cart},add_cart:function(t){var a,e=!1;for(a=0;a<this.cartItems.length;a++)t.isbn===this.cartItems[a].book.isbn&&(this.cartItems[a].quantity+=1,e=!0);e||this.cartItems.push({book:t,quantity:1})},total_amount:function(t,a){return t*a},calculate_total_price:function(){var t,a=0;for(t=0;t<this.cartItems.length;t++)a+=this.total_amount(this.cartItems[t].book.precio,this.cartItems[t].quantity);this.price=a}}},h={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",{attrs:{href:"#"}},[t._v("NavBar")]),t._v(" "),e("b-nav-form",[e("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"md",placeholder:"Search"}}),t._v(" "),e("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"md",type:"submit"}},[t._v("Search")])],1),t._v(" "),e("b-navbar-nav",{staticClass:"ml-auto"},[e("ul",{staticClass:"navbar-nav nav-fill w-100",attrs:{id:"menu-main-nav"}},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link"},[e("b-icon",{attrs:{icon:"bookmark-heart","font-scale":"2.5"}})],1)]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link"},[e("b-icon",{attrs:{title:"Strikethrough",icon:"basket","font-scale":"2.5"},on:{click:function(a){t.show_cart(),t.calculate_total_price()}}})],1)]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link"},[e("b-button",{attrs:{variant:"danger"}},[t._v("Log In")])],1)])])])],1)],1),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),!1===t.see_cart?e("b-container",[e("b-row",[e("b-col",{attrs:{cols:"4"}},[e("br"),t._v(" "),e("img",{staticStyle:{height:"436px",width:"280px"},attrs:{src:t.getURL(),alt:""}}),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("h6",[t._v(" Puntuació ")])]),t._v(" "),e("b-col",{attrs:{cols:"5"}},[e("br"),t._v(" "),e("h2",[t._v(" "+t._s(this.single_book.titulo)+" ")]),t._v(" "),e("p"),e("h4",[t._v(" de "+t._s(this.single_book.autor)+" ")]),t._v(" "),e("p"),e("hr"),t._v(" "),e("h5",[t._v(" Sinopsis ")]),t._v(" "),e("p",[t._v("\n        "+t._s(this.single_book.sinopsis)+"\n        ")])]),t._v(" "),e("b-col",{staticClass:"justify-content-center"},[e("b-container",{staticClass:"border bg-light",staticStyle:{padding:"15px"},attrs:{fluid:""}},[e("h5",[t._v(" Comprar el llibre ")]),t._v(" "),e("b",[t._v(t._s(this.single_book.precio)+" $")]),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("b-button",{staticStyle:{width:"100%"},attrs:{variant:"danger"},on:{click:function(a){return t.add_cart(t.single_book)}}},[t._v("Afegir a la cistella")]),e("br"),e("br"),t._v(" "),e("b-button",{staticStyle:{width:"100%"},attrs:{variant:"dark"}},[t._v("Comprar ara")]),e("br"),e("br"),t._v(" "),e("b-button",{staticStyle:{width:"100%"},attrs:{variant:"dark"}},[t._v(" Afegir a la llista de desitjos")])],1)],1)],1)],1):t._e(),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),!0===t.see_cart?e("b-container",[e("h2",[t._v(" CISTELLA "+t._s(this.cartItems.length)+" PRODUCTES ")])]):t._e(),t._v(" "),e("br"),t._v(" "),!0===t.see_cart?e("b-container",[e("b-row",[e("b-col",{attrs:{cols:"8"}},[e("b-container",{staticStyle:{padding:"35px"},attrs:{fluid:""}},t._l(t.cartItems,function(a){return e("b-row",{key:a.book.isbn,staticClass:"border bg-light",staticStyle:{padding:"35px","margin-bottom":"10px"}},[e("b-col",[e("img",{staticStyle:{height:"109px",width:"70px"},attrs:{src:t.getURL(a.book),alt:""},on:{click:function(e){return t.gotobook(a.book)}}})]),t._v(" "),e("b-col",[e("h6",{on:{click:function(a){return t.gotobook(t.book)}}},[t._v(" "+t._s(a.book.titulo))]),t._v(" "),e("h5",[t._v(" "+t._s(a.book.autor))])]),t._v(" "),e("b-col",[e("b-row",[e("h6",[t._v(t._s(t.total_amount(a.book.precio,a.quantity)))])]),t._v(" "),e("br"),t._v(" "),e("b-row",[e("b-form-spinbutton",{staticStyle:{width:"45%"},attrs:{id:"sb-inline",min:"1"},on:{click:function(e){t.total_amount(a.book.precio,a.quantity),t.calculate_total_price()}},model:{value:a.quantity,callback:function(e){t.$set(a,"quantity",e)},expression:"item.quantity"}})],1)],1),t._v(" "),e("hr")],1)}),1)],1),t._v(" "),e("b-col",[e("b-container",{staticClass:"border bg-light",staticStyle:{padding:"15px"},attrs:{fluid:""}},[e("p",[t._v(" Tens un codi de descompte? ")]),t._v(" "),e("b-nav-form",[e("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Introdueix el teu codi descompte"}}),t._v(" "),e("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"sm",type:"submit"}},[t._v("Validar")])],1)],1),t._v(" "),e("b-container",{staticClass:"border bg-light",staticStyle:{padding:"15px","margin-top":"10px"},attrs:{fluid:""}},[e("br"),t._v(" "),e("h5",[t._v(" Resum ")]),t._v(" "),e("br"),t._v(" "),e("h6",[t._v(" "+t._s(this.price)+"$ ")]),t._v(" "),e("hr"),t._v(" "),e("h6",[t._v(" Despeses enviament : Gratuït")]),t._v(" "),e("hr"),t._v(" "),e("h5",[t._v(" Total : "+t._s(this.price)+" $ ")]),t._v(" "),e("br"),t._v(" "),e("b-button",{staticStyle:{width:"100%"},attrs:{variant:"danger"}},[t._v("Finalitzar compra")]),e("br"),e("br")],1)],1)],1)],1):t._e(),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("footer",{staticStyle:{height:"auto","background-color":"black",bottom:"0"}},[a("h5",{staticStyle:{color:"white",padding:"20px",margin:"0","text-align":"center"}},[this._v("Contact, bla, bla")])])}]},g=e("VU/8")(_,h,!1,null,null,null).exports,f={data:function(){return{isbn:"",stock:"",precio:"",titulo:"",author:"",editorial:"",date:"",url:"",sinopsis:""}},methods:{modifyBook:function(){var t=this,a={isbn:this.isbn,stock:this.stock,precio:this.price,titulo:this.title,autor:this.author,editorial:this.editorial,fecha_de_publicacion:this.date,url_imagen:this.url,sinopsis:this.sinopsis},e="http://127.0.0.1:5000/book/"+this.isbn;c.a.put(e,a).then(function(a){console.log("BOOK MODIFIED"),t.initForm(),alert("Book modify correctly")}).catch(function(a){t.initForm(),console.error(a)})},initForm:function(){this.isbn="",this.stock="",this.price="",this.title="",this.author="",this.editorial="",this.date="",this.url="",this.sinopsis=""}}},k={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",{attrs:{href:"#"}},[t._v("NavBar")])],1),t._v(" "),e("b-container",[e("div",{staticClass:"row d-flex justify-content-center"},[e("div",{staticClass:"col-sm"},[e("div",{staticClass:"form-control bg-light",staticStyle:{"margin-top":"100px"}},[e("div",{staticClass:"form-label-group"},[e("div",{staticClass:"row justify-content-center"},[e("h4",[t._v("Modificar libro")])]),t._v(" "),e("b-row",[e("b-col",{attrs:{cols:"8"}},[e("b-container",[e("b-row",{attrs:{"align-h":"between"}},[e("b-col",{attrs:{cols:"5"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.isbn,expression:"isbn"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"isbn",type:"number",placeholder:"ISBN",required:"",autofocus:""},domProps:{value:t.isbn},on:{input:function(a){a.target.composing||(t.isbn=a.target.value)}}})]),t._v(" "),e("b-col",{attrs:{cols:"3"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.stock,expression:"stock"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"stock",placeholder:"Stock",required:"",autofocus:""},domProps:{value:t.stock},on:{input:function(a){a.target.composing||(t.stock=a.target.value)}}})]),t._v(" "),e("b-col",{attrs:{cols:"3"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"price"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"price",placeholder:"Precio",required:"",autofocus:""},domProps:{value:t.price},on:{input:function(a){a.target.composing||(t.price=a.target.value)}}})])],1),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"title",placeholder:"Titulo",required:"",autofocus:""},domProps:{value:t.title},on:{input:function(a){a.target.composing||(t.title=a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.author,expression:"author"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"author",placeholder:"Autor",required:"",autofocus:""},domProps:{value:t.author},on:{input:function(a){a.target.composing||(t.author=a.target.value)}}}),t._v(" "),e("b-row",{attrs:{"align-h":"between"}},[e("b-col",{attrs:{cols:"8"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editorial,expression:"editorial"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"editorial",placeholder:"Editorial",required:"",autofocus:""},domProps:{value:t.editorial},on:{input:function(a){a.target.composing||(t.editorial=a.target.value)}}})]),t._v(" "),e("b-col",{attrs:{cols:"4"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"date",placeholder:"YYYY-MM-DD",required:"",autofocus:""},domProps:{value:t.date},on:{input:function(a){a.target.composing||(t.date=a.target.value)}}})])],1),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"url",placeholder:"URL",required:"",autofocus:""},domProps:{value:t.url},on:{input:function(a){a.target.composing||(t.url=a.target.value)}}}),t._v(" "),e("b-form-textarea",{staticStyle:{"margin-top":"15px"},attrs:{id:"sinopsis",placeholder:"Sinopsis",required:"",autofocus:""},model:{value:t.sinopsis,callback:function(a){t.sinopsis=a},expression:"sinopsis"}})],1),t._v(" "),e("div",{staticClass:" row d-flex text-center"},[e("b-col",{attrs:{"align-self":"center"}},[e("b-button",{staticStyle:{"margin-top":"15px","margin-botton":"30px"},attrs:{size:"lg",variant:"primary"},on:{click:function(a){return t.modifyBook()}}},[t._v("Modificar")])],1)],1)],1),t._v(" "),e("b-col",[e("img",{attrs:{src:"https://placehold.it/240x340/"}})])],1)],1)])])])])],1)},staticRenderFns:[]},y=e("VU/8")(f,k,!1,null,null,null).exports,x={data:function(){return{clientId:"374016962135-l70k72dvqf1ugd3pirf58ti292v8gk1a.apps.googleusercontent.com",username:"",email:"",password:"",role:"",token:""}},methods:{OnGoogleAuthSuccess:function(t){console.log(t)},OnGoogleAuthFail:function(t){console.log(t)},checkLogin:function(){var t=this,a={username:this.username,email:this.email,password:this.password};c.a.post("http://127.0.0.1:5000/login",a).then(function(a){t.getAccount(),t.token=a.data.token,t.initForm(),console.log("ACCOUNT LOGED"),alert("User loged")}).catch(function(t){alert("ERROR: Wrong Logged"),console.error(t)})},getAccount:function(){var t=this,a="http://127.0.0.1:5000/user/"+this.email;c.a.get(a).then(function(a){t.role=a.data.role,console.log("ACCOUNT GETTED")}).catch(function(t){console.error(t)})},goRegister:function(){var t=this;c.a.get("http://127.0.0.1:5000/#/").then(function(a){t.$router.push({path:"/userregister"})}).catch(function(t){console.error(t)})},initForm:function(){this.email="",this.password=""}}},w={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",{attrs:{href:"#"}},[t._v("NavBar")])],1),t._v(" "),e("b-container",[e("div",{staticClass:"row d-flex justify-content-center"},[e("div",{staticClass:"col-md-4"},[e("div",{staticClass:"form-control  bg-light",staticStyle:{"margin-top":"150px"}},[e("div",{staticClass:"form-label-group"},[e("b-button",{staticStyle:{"margin-left":"100px"},attrs:{variant:"link"},on:{click:function(a){return t.goRegister()}}},[t._v("¿Quieres crear una cuenta?")]),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("h5",[t._v("Iniciar Sesión")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{type:"email",id:"inputEmail",placeholder:"Correo electrónico",required:"",autofocus:""},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",staticStyle:{"margin-top":"20px"},attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value)}}}),t._v(" "),e("b-form-text",{staticStyle:{"margin-top":"15px","margin-left":"5px"}},[t._v("\n              Al continuar confirmas que aceptas las "),e("a",{attrs:{href:"#"}},[t._v("Condiciones de uso")]),t._v(" y las "),e("a",{attrs:{href:"#"}},[t._v("Políticas de privacidad")])]),t._v(" "),e("b-button",{staticStyle:{"margin-top":"20px"},attrs:{block:"",variant:"danger"},on:{click:function(a){return t.checkLogin()}}},[t._v("Log In")]),t._v(" "),e("b-button",{staticStyle:{"margin-top":"10px"},attrs:{block:"",variant:"link"}},[t._v("¿Olvidaste contraseña?")]),t._v(" "),e("hr"),t._v(" "),e("b-button",{directives:[{name:"google-signin-button",rawName:"v-google-signin-button",value:t.clientId,expression:"clientId"}],staticClass:"google-signin-button",attrs:{block:"",variant:"primary"}},[t._v(" Continue with Google")])],1)])])])])],1)])},staticRenderFns:[]},C=e("VU/8")(x,w,!1,null,null,null).exports,S={data:function(){return{isbn:"",stock:"",precio:"",titulo:"",author:"",editorial:"",date:"",url:"",sinopsis:""}},methods:{addBook:function(){var t=this,a={isbn:this.isbn,stock:this.stock,precio:this.price,titulo:this.title,autor:this.author,editorial:this.editorial,fecha_de_publicacion:this.date,url_imagen:this.url,sinopsis:this.sinopsis};c.a.post("http://127.0.0.1:5000/book",a).then(function(a){console.log("BOOK ADDED"),t.initForm(),alert("Book ADDED correctly")}).catch(function(a){t.initForm(),console.error(a)})},initForm:function(){this.isbn="",this.stock="",this.price="",this.title="",this.author="",this.editorial="",this.date="",this.url="",this.sinopsis=""}}},q={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",{attrs:{href:"#"}},[t._v("NavBar")])],1),t._v(" "),e("b-container",[e("div",{staticClass:"row d-flex justify-content-center"},[e("div",{staticClass:"col-sm"},[e("div",{staticClass:"form-control bg-light",staticStyle:{"margin-top":"100px"}},[e("div",{staticClass:"form-label-group"},[e("div",{staticClass:"row justify-content-center"},[e("h4",[t._v("Añadir libro")])]),t._v(" "),e("b-row",[e("b-col",{attrs:{cols:"8"}},[e("b-container",[e("b-row",{attrs:{"align-h":"between"}},[e("b-col",{attrs:{cols:"5"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.isbn,expression:"isbn"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"isbn",placeholder:"ISBN ",required:"",autofocus:""},domProps:{value:t.isbn},on:{input:function(a){a.target.composing||(t.isbn=a.target.value)}}})]),t._v(" "),e("b-col",{attrs:{cols:"3"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.stock,expression:"stock"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"stock",placeholder:"Stock",required:"",autofocus:""},domProps:{value:t.stock},on:{input:function(a){a.target.composing||(t.stock=a.target.value)}}})]),t._v(" "),e("b-col",{attrs:{cols:"3"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"price"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"price",placeholder:"Precio",required:"",autofocus:""},domProps:{value:t.price},on:{input:function(a){a.target.composing||(t.price=a.target.value)}}})])],1),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"title",placeholder:"Titulo",required:"",autofocus:""},domProps:{value:t.title},on:{input:function(a){a.target.composing||(t.title=a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.author,expression:"author"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"author",placeholder:"Autor",required:"",autofocus:""},domProps:{value:t.author},on:{input:function(a){a.target.composing||(t.author=a.target.value)}}}),t._v(" "),e("b-row",{attrs:{"align-h":"between"}},[e("b-col",{attrs:{cols:"8"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editorial,expression:"editorial"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"editorial",placeholder:"Editorial",required:"",autofocus:""},domProps:{value:t.editorial},on:{input:function(a){a.target.composing||(t.editorial=a.target.value)}}})]),t._v(" "),e("b-col",{attrs:{cols:"4"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"date",placeholder:"YYYY-MM-DD",required:"",autofocus:""},domProps:{value:t.date},on:{input:function(a){a.target.composing||(t.date=a.target.value)}}})])],1),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],staticClass:"form-control",staticStyle:{"margin-top":"15px"},attrs:{id:"url",placeholder:"URL",required:"",autofocus:""},domProps:{value:t.url},on:{input:function(a){a.target.composing||(t.url=a.target.value)}}}),t._v(" "),e("b-form-textarea",{staticStyle:{"margin-top":"15px"},attrs:{id:"sinopsis",placeholder:"Sinopsis",required:"",autofocus:""},model:{value:t.sinopsis,callback:function(a){t.sinopsis=a},expression:"sinopsis"}})],1),t._v(" "),e("div",{staticClass:" row d-flex text-center"},[e("b-col",{attrs:{"align-self":"center"}},[e("b-button",{staticStyle:{"margin-top":"15px","margin-botton":"30px"},attrs:{size:"lg",variant:"primary"},on:{click:function(a){return t.addBook()}}},[t._v("Añadir Libro")])],1)],1)],1),t._v(" "),e("b-col",[e("img",{attrs:{src:"https://placehold.it/240x340/"}})])],1)],1)])])])])],1)},staticRenderFns:[]},N=e("VU/8")(S,q,!1,null,null,null).exports,I={data:function(){return{username:"",email:"",password:""}},methods:{createUser:function(){var t=this,a={username:this.username,email:this.email,password:this.password1};c.a.post("http://127.0.0.1:5000/user",a).then(function(a){t.initForm(),console.log("ACCOUNT CREATED"),alert("Account created")}).catch(function(a){console.error(a),t.initForm(),alert("Username already in use")})},initForm:function(){this.username="",this.email="",this.password1="",this.password2=""}}},P={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("div",[e("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[e("b-navbar-brand",{attrs:{href:"#"}},[t._v("NavBar")])],1),t._v(" "),e("b-container",[e("div",{staticClass:"row d-flex justify-content-center"},[e("div",{staticClass:"col-md"},[e("div",{staticClass:"form-control  bg-light",staticStyle:{"margin-top":"100px"}},[e("div",{staticClass:"form-label-group"},[e("h5",[t._v("Crear cuenta")]),t._v(" "),e("label",{staticStyle:{"margin-top":"15px"}},[t._v("Username")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"username",id:"inputUsername",placeholder:"Username",required:"",autofocus:""},domProps:{value:t.username},on:{input:function(a){a.target.composing||(t.username=a.target.value)}}}),t._v(" "),e("label",{staticStyle:{"margin-top":"15px"}},[t._v("Correo electronico")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"e-mail",id:"inputEmail",placeholder:"Correo Electronico",required:"",autofocus:""},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value)}}}),t._v(" "),e("label",{staticStyle:{"margin-top":"15px"}},[t._v("Contraseña")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password1,expression:"password1"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword1",placeholder:"Contraseña",required:""},domProps:{value:t.password1},on:{input:function(a){a.target.composing||(t.password1=a.target.value)}}}),t._v(" "),e("label",{staticStyle:{"margin-top":"15px"}},[t._v("Confirmar contraseña")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password2,expression:"password2"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword2",placeholder:"Confirmar contraseña",required:""},domProps:{value:t.password2},on:{input:function(a){a.target.composing||(t.password2=a.target.value)}}}),t._v(" "),e("b-button",{staticStyle:{"margin-top":"20px"},attrs:{variant:"danger"},on:{click:function(a){return t.createUser()}}},[t._v("Crear usuario")])],1)])])])])],1)])},staticRenderFns:[]},E=e("VU/8")(I,P,!1,null,null,null).exports;r.default.use(n.a);var B=new n.a({routes:[{path:"/",name:"main",component:b},{path:"/book",name:"book",component:g},{path:"/modify",name:"modify_books",component:y},{path:"/userregister",name:"RegisterForm",component:E},{path:"/delete",name:"delete_books",component:v},{path:"/userlogin",name:"Login",component:C},{path:"/add",name:"AddBooks",component:N}]}),U=e("6KHs");r.default.use(o.a),r.default.use(o.b),r.default.config.productionTip=!1,new r.default({router:B,GoogleSignInButton:U.a,render:function(t){return t(s)}}).$mount("#app")},sWs5:function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.db1196f3ea56e6c18b6f.js.map