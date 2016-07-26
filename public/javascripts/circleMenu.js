function init() {
  var data = [300, 300, 300, 300];
  var buttons = ['add', 'delete', 'fuck'];

  var ringWidth = 20;
  var ringRadius = 80;
  var buttonRadius = 30;
  var duration = 200;

  var svg = d3.select('svg');
  svg.selectAll('g.node')
    .data(data)
    .enter()
    .append('circle')
    .attr('id', function (d, i) { return d + i; })
    .attr('cx', function (d, i) { return 100 + 200 * i; })
    .attr('cy', function (d) { return 200; })
    .attr('r', function (d) { return d / 10; })
    .on('click', function (d, i) {
      var clickedCircleCx = parseInt(d3.event.srcElement.attributes.cx.value);
      var clickedCircleCy = parseInt(d3.event.srcElement.attributes.cy.value);
      var clickedCircleId = d3.event.srcElement.id;
      // remove old ring
      svg.selectAll('circle.ring').remove();
      svg.selectAll('circle.ring-button').remove();
      svg.selectAll('text.circle-button-name').remove();
      // show ring
      var outCircle = svg.append('circle')
        .attr('id', 'out-circle')
        .attr('class', 'ring')
        .attr('cx', clickedCircleCx)
        .attr('cy', clickedCircleCy)
        .attr('r', 0)
        .attr('fill', 'orange');
      var inCircle = svg.append('circle')
        .attr('id', 'in-circle')
        .attr('class', 'ring')
        .attr('cx', clickedCircleCx)
        .attr('cy', clickedCircleCy)
        .attr('r', 0)
        .attr('fill', 'white');
      var n = 0;
      outCircle.transition().duration(duration).attr('r', ringWidth + ringRadius);
      inCircle.transition().duration(duration).attr('r', ringRadius).on('end', function () {

      });
      // show buttons on ring
      var circleButtonEnter = svg.selectAll('circle.button').data(buttons).enter();
      var circleButton = circleButtonEnter
        .append('circle')
        .attr('class', 'ring-button')
        .attr('r', 0)
        .attr('cx', function (d, i) {
          return clickedCircleCx;
        })
        .attr('cy', function (d, i) {
          return clickedCircleCy;
        })
        // .attr('transform', function (d, i) {
        //   return 'rotate(' + i * 360 / buttons.length + ','
        //     + clickedCircleCx + ','
        //     + clickedCircleCy + ')'
        // })

        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'white')
        .transition()
        .attr('transform', circleButtonTransform)
        .duration(duration)
        .attr('r', buttonRadius)
      // .attrTween('transform', tween);
      circleButtonEnter.append('text')
        .attr('class', 'circle-button-name')
        .attr('dx', -10)
        .attr('x', clickedCircleCx)
        .attr('y', clickedCircleCy)
        .transition()
        .attr('transform', circleButtonTransform)
        .text(function (d) { return 'fuck' });

      function circleButtonTransform(d, i, a) {
        var ringButtonX = (Math.sin(2 / buttons.length * i * Math.PI) * ringRadius).toFixed(10);
        var ringButtonY = (Math.cos(2 / buttons.length * i * Math.PI) * ringRadius).toFixed(10);
        return 'translate(' + ringButtonX + ',' + -ringButtonY + ')'
      }

      function tween(d, i, a) {
        return d3.interpolateString("rotate(0," + clickedCircleCx + "," + clickedCircleCy + ")", 'rotate(' + i * 360 / buttons.length + ' '
          + clickedCircleCx + ' '
          + clickedCircleCy + ')');
      }


      // show clicked circle
      svg.selectAll('use').remove();
      svg.append('use')
        .attr('xlink:href', '#' + clickedCircleId);
    });
}

init();

