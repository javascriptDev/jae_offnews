/**
 * Created by a2014 on 14-5-29.
 * template file
 */
require.define('tpl', [], function (require, exports) {

    //模板1
    exports.l1 = "<div><%for (var i=0;i<list.length;i++) {%>" +
        "<div class=list-item>" +
        "<div><%=list[i].user%></div>" +
        "</div>" +
        "<%}%>";
    //模板2
    exports.l2 = "<%for (var i=0;i<list.length;i++) {%>" +
        "<div class=list-item>" +
        "<img draggable='false' src=<%= list[i].image%> />" +
        "<div> <%=list[i].user%></div>" +
        "</div>" +
        "<%}%>";
    exports.l3 = "<%for (var i=0;i<list.length;i++) {%>" +
        "<div class=list-item>" +
        "<img draggable='false' src=<%= list[i].image%> />" +
        "<div> <%=list[i].user%></div>" +
        "<div> <%=list[i].age%></div>" +
        "<div> <%=list[i].school%></div>" +
        "<div> <%=list[i].date%></div>" +
        "</div>" +
        "<%}%>";
    exports.l4 = "<%for (var i=0;i<list.length;i++) {%>" +
        "<div class=list-item>" +
        "<div> <%=list[i].user%></div>" +
        "<div> <%=list[i].age%></div>" +
        "<div> <%=list[i].school%></div>" +
        "<div> <%=list[i].date%></div>" +
        "</div>" +
        "<%}%>";
})