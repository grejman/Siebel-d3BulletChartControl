if (typeof (SiebelAppFacade.vc_d3BulletChartPW) === "undefined") {
  SiebelJS.Namespace("SiebelAppFacade.gmD3BulletChartPW");
  define("siebel/custom/gmD3BulletChartPW", ["order!siebel/custom/d3js/d3.v3.min","order!siebel/pwinfra"], function () {
    SiebelAppFacade.gmD3BulletChartPW = (function () {

      var gUtils     = SiebelJS.Dependency("SiebelApp.Utils");
      var gConstants = SiebelJS.Dependency("SiebelApp.Constants");

        var script = document.createElement('script');
        script.async = false;
        script.src = SIEBEL_BUILD + "siebel/custom/d3bulletchart/bullet" + ".js";
        document.head.appendChild(script);
        script = null;

      function gmD3BulletChartPW(pm) {

        var gD3SVG    = null;
        this.GetD3SVG = function()     { return gD3SVG;   };
        this.SetD3SVG = function(aObj) { gD3SVG = aObj;   };

        var gGlobals  = {
               margin: {top: 5, right: 40, bottom: 20, left: 120},
               width: 0,
               height: 50,
               chart: null
            };
        gGlobals.width  = 560 - gGlobals.margin.left - gGlobals.margin.right;
        gGlobals.height = 50 -  gGlobals.margin.top  - gGlobals.margin.bottom;

        this.GetGlobals = function()   { return gGlobals; };

        SiebelAppFacade.gmD3BulletChartPW.superclass.constructor.apply(this, arguments);
      }

      SiebelJS.Extend(gmD3BulletChartPW, SiebelAppFacade.FieldPW);

      gmD3BulletChartPW.prototype.Init = function () {
        SiebelAppFacade.gmD3BulletChartPW.superclass.Init.apply(this, arguments);
      }

      gmD3BulletChartPW.prototype.ShowUI = function () {

        SiebelAppFacade.gmD3BulletChartPW.superclass.ShowUI.apply(this, arguments);

        var lEl       = this.GetEl();
        var lElName   = this.control.GetInputName();
        var lGlobals  = this.GetGlobals();
        var lD3SVG    = null;
        var lData     = [{title:"",subtitle:"",ranges:[0,0],measures:[0,0],markers:[0]}];

        $("[name='" + lElName + "']").replaceWith("<div id='" + lElName + "' name='" + lElName + "'></div>");
        lGlobals.chart = d3.bullet().width(lGlobals.width).height(lGlobals.height);

        lD3SVG = d3.selectAll("#" + lElName).selectAll("svg")
                    .data(lData)
                  .enter().append("svg")
                    .attr("class", "vc_bullet")
                    .attr("id",lElName)
                    .attr("width",  lGlobals.width  + lGlobals.margin.left + lGlobals.margin.right)
                    .attr("height", lGlobals.height + lGlobals.margin.top  + lGlobals.margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + lGlobals.margin.left + "," + lGlobals.margin.top + ")")
                    .call(lGlobals.chart);

        var lTitle = lD3SVG.append("g")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + lGlobals.height / 2 + ")");

        lTitle.append("text")
            .attr("class", "vc_bullet_title")
            .text(function(d) { return d.title; });

        lTitle.append("text")
            .attr("class", "vc_bullet_subtitle")
            .attr("dy", "1em")
            .text(function(d) { return d.subtitle; });

        this.SetD3SVG(lD3SVG);
      }

      gmD3BulletChartPW.prototype.BindEvents = function () {
        SiebelAppFacade.gmD3BulletChartPW.superclass.BindEvents.apply(this, arguments);
      }

      gmD3BulletChartPW.prototype.GetValue = function () {
        var retVal = SiebelAppFacade.gmD3BulletChartPW.superclass.GetValue.apply(this, arguments);
        return (retVal);
      }

      gmD3BulletChartPW.prototype.SetValue = function (value, index) {

        SiebelAppFacade.gmD3BulletChartPW.superclass.SetValue.apply(this, arguments);

        var lEl       = this.GetEl(index);
        var lElName   = this.control.GetInputName();
        var lD3El     = d3.select($("div#" + lElName));
        //var lValue    = $.parseJSON('[{"title":"SR170623-032850","subtitle":"New","ranges":[59.30,200],"measures":[59.30, 9],"markers":[119.6]}]');
        var lValue    = $.parseJSON(value);
        lValue[0].ranges[1] = parseInt(d3.max([lValue[0].ranges,lValue[0].measures,lValue[0].markers])) + 480;

        this.GetD3SVG().datum(function (d) {
                                d.ranges   = lValue[0].ranges.map(function (m) {return m / 60;});
                                d.markers  = lValue[0].markers.map(function (m) {return m / 60;});
                                d.measures = lValue[0].measures.map(function (m) {return m / 60;});
                                d.title    = lValue[0].title;
                                d.subtitle = lValue[0].subtitle;
                                return d;
                              }).call(this.GetGlobals().chart.duration(1000));

        this.GetD3SVG().select(".vc_bullet_title").text(lValue[0].title);
        this.GetD3SVG().select(".vc_bullet_subtitle").text(lValue[0].subtitle);
      }

      gmD3BulletChartPW.prototype.EndLife = function () {
        this.SetD3SVG(null);
        
        SiebelAppFacade.gmD3BulletChartPW.superclass.EndLife.apply(this, arguments);
      }

      gmD3BulletChartPW.prototype.InjectQTPInfo = function (el) {
        // InjectQTPInfo is used to inject the automation attributes ot (object type), un (UI name), and rn (repository name).
        // Add code here that should happen before default processing
        SiebelAppFacade.gmD3BulletChartPW.superclass.InjectQTPInfo.apply(this, arguments);
        // Add code here that should happen after default processing
      }

      return gmD3BulletChartPW;
    }());

    SiebelApp.S_App.PluginBuilder.AttachPW(consts.get("SWE_CTRL_TEXT"), SiebelAppFacade.gmD3BulletChartPW, function (control, objName) {
			return control.GetName().indexOf('vc_d3BulletChart') > -1;
    });

    return "SiebelAppFacade.gmD3BulletChartPW";
  })
}
