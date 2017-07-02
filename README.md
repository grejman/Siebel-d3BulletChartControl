# Siebel-D3 Bullet Chart

Siebel Open-UI implementation of the d3js Bullet Chart Control using Phisical Wraper.

The chart is used to display the open time of a service request in relation to the Commit Time, Service Calendar Time Open with and without pending times.

* https://d3js.org/
* https://github.com/mcgovey/D3-Bullet-Chart

# Siebel Vertion

  IP2015
  IP2016

# Implementation

To implement the Physical Wraper the following will need to be done:

* Load the Physical Wraper "gmD3BulletChartPW.js" to the "..\PUBLIC\scripts\Siebel\custom" folder.
* Load the Style Sheet "gmD3BulletChart.css to the "..\PUBLIC\files\custom" folder.
* Load the d3bulletchart folder and files to the "..\PUBLIC\scripts\Siebel\custom" folder.
  * Note: for the latest version of d3bulletchart please refer to https://github.com/mcgovey/D3-Bullet-Chart Site.
* Load the d3js folder and files to the "..\PUBLIC\scripts\Siebel\custom" folder.
  * Note: for the latest version of d3js please refer to https://d3js.org/ Site.
* On the BusComp create a Text field that returns a json string in the following format:

  [{"title":"","subtitle":"","ranges":[59.30,200],"measures":[59.30, 9],"markers":[119.6]}]

* On your Applet create a control  with the name "gmD3BulletChart".
* Add the Physical Wraper to the Application under Manifest Administration.
* Add the Style Sheet to the Application under Manifest Administration.

Note: That I have not completed this control and will be making more changes.  The control is not supported on Tile applets.

# Contributions

Contributions are welcome.

# Example

![Example](/images/sample.png)
