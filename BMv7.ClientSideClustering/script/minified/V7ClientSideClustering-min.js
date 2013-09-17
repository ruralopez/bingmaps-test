﻿var ClusterPlacementTypes={MeanAverage:0,GridCenter:1,FirstLocation:2};var ClusteredEntityCollection=function(a,l){var c=a,i,b=[],d,g;var k={gridSize:45,clusterPlacementType:ClusterPlacementTypes.MeanAverage,layerOffset:new Microsoft.Maps.Point(0,0),clusteringEnabled:true,singlePinCallback:function(m){return new Microsoft.Maps.Pushpin(m._LatLong)},clusteredPinCallback:function(n){var m=new Microsoft.Maps.Pushpin(n._LatLong,{text:"+"});m.description=j.length+" locations<br/>Zoom in for more details.";return m},callback:null};function h(){i=new Microsoft.Maps.EntityCollection();c.entities.push(i);f(l);Microsoft.Maps.Events.addHandler(c,"viewchangeend",j)}function e(n,p){switch(k.clusterPlacementType){case ClusterPlacementTypes.MeanAverage:var q=0,r=0;var o=n.length-1;if(o>=0){do{q+=n[o]._LatLong.latitude;r+=n[o]._LatLong.longitude}while(o--)}return new Microsoft.Maps.Location(q/n.length,r/n.length);case ClusterPlacementTypes.GridCenter:var m=((p%d)+0.5)*k.gridSize+k.layerOffset.x;var s=(Math.floor(p/d)+0.5)*k.gridSize+k.layerOffset.y;return c.tryPixelToLocation(new Microsoft.Maps.Point(m,s),Microsoft.Maps.PixelReference.control);default:case ClusterPlacementTypes.FirstLocation:return n[0]._LatLong}}function j(){i.clear();if(b!=null){var t=c.getWidth();var u=c.getHeight();d=parseInt(Math.ceil(t/k.gridSize));g=parseInt(Math.ceil(u/k.gridSize));var s=b.length-1,n,p,q,v,m;if(k.clusteringEnabled){var r=new Array(d*g);if(s>=0){do{n=c.tryLocationToPixel(b[s]._LatLong,Microsoft.Maps.PixelReference.control);if(n!=null&&n.x<=t&&n.y<=u&&n.x>=0&&n.y>=0){p=Math.floor(n.x/k.gridSize);q=Math.floor(n.y/k.gridSize);v=p+q*d;if(r[v]==null){r[v]=[]}r[v].push(b[s]);b[s].GridKey=v}else{b[s].GridKey=-1}}while(s--)}s=r.length-1;if(s>=0){do{if(r[s]!=null){switch(r[s].length){case 1:m=k.singlePinCallback(r[s][0]);m.isClustered=false;break;default:var o=e(r[s],s);m=k.clusteredPinCallback(r[s],o);m.isClustered=true;break}m.GridKey=s;i.push(m)}}while(s--)}}else{if(s>=0){do{n=c.tryLocationToPixel(b[s]._LatLong,Microsoft.Maps.PixelReference.control);if(n!=null&&n.x<=t&&n.y<=u&&n.x>=0&&n.y>=0){b[s].GridKey=s;m=k.singlePinCallback(b[s]);m.GridKey=s;m.isClustered=false;i.push(m)}else{b[s].GridKey=-1}}while(s--)}}}if(k.callback){k.callback()}}function f(m){for(attrname in m){k[attrname]=m[attrname]}j()}this.GetLayer=function(){return i};this.GetOptions=function(){return k};this.SetOptions=function(m){f(m)};this.BringLayerToFront=function(){var n=c.entities.getLength()-1,m;if(n>=0){do{m=c.entities.get(n);if(m.clear!=null){m.setOptions({zIndex:0})}}while(n--);n=c.entities.indexOf(i);m=c.entities.get(n);m.setOptions({zIndex:1})}};this.SetData=function(n){if(n!=null){b=n;var m=b.length-1;if(m>0){do{b[m]._LatLong=new Microsoft.Maps.Location(b[m].Latitude,b[m].Longitude)}while(m--)}}else{b=[]}j()};this.GetData=function(){return b};this.GetDisplayedData=function(){var m=[];var n=b.length-1;if(n>=0){do{if(b[n].GridKey!=-1){m.push(b[n])}}while(n--)}return m.reverse()};this.GetDataByGridKey=function(o,p){var m=[];var n=b.length-1;if(n>=0){if(p){do{if(o==b[n].GridKey){m.push(b[n])}}while(n--)}else{do{if(o==b[n].GridKey){m.push(b[n]);break}}while(n--)}}return m.reverse()};this.GetPinByGridKey=function(o){var n=i.getLength()-1,m;if(n>=0){do{m=i.get(n);if(m.GridKey==o){return m}}while(n--)}return null};h()};