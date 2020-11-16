import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataEntry} from '../../model/graph';
import {SettingsService} from '../../services/settings-service';

declare let d3: any;

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('dataSet') dataSet: Array<DataEntry> = null;

  private svg;
  private margin = ({top: 30, right: 0, bottom: 30, left: 50});

  private width = 400;
  private height = 380;

  private x: any;
  private y: any;

  private xAxis: any;
  private yAxis: any;

  private dateFormatDefault = 'LLL dd';
  private dateFormatShort = 'dd.LL';

  private axisFontSizeDefault = '1.2em';
  private axisFontSizeSmall = '0.8em';

  private color = 'steelblue';

  @ViewChild('barGraph', {static: true}) barGraph: ElementRef;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {

    const numRecords = this.settingsService.settings.numberOfRecords;

    let dateFormat = this.dateFormatDefault;
    if (numRecords > 7) {
      dateFormat = this.dateFormatShort;
    }

    this.x = d3.scaleBand()
      .domain(d3.range(numRecords))
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    this.y = d3.scaleLinear()
      .domain([0, d3.max(this.dataSet, d => d.value)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.xAxis = (gx) => gx
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.x).tickFormat(i => this.dataSet[i].dateTime.toFormat(dateFormat)).tickSizeOuter(0));

    this.yAxis = (gy) => {
      gy.attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(this.y).ticks(4))
        .call(g => g.select('.domain').remove());
    };

  }

  ngAfterViewInit(): void {

    const numRecords = this.settingsService.settings.numberOfRecords;
    let axisFontSize = this.axisFontSizeDefault;
    if (numRecords > 10) {
      axisFontSize = this.axisFontSizeSmall;
    }

    this.svg = d3.select(this.barGraph.nativeElement)
      .attr('viewBox', [0, 0, this.width + this.margin.left + this.margin.right, this.height]);

    const rect = this.svg.selectAll('g').data(this.dataSet)
      .join('g')
      .attr('fill', this.color)
      .append('rect')
      .attr('x', (d, i) => this.x(i))
      .attr('y', this.height - this.margin.bottom)
      .attr('height', 0)
      .attr('width', this.x.bandwidth());

    this.svg.append('g')
      .attr('class', 'axis')
      .call(this.xAxis);

    this.svg.append('g')
      .attr('class', 'axis')
      .call(this.yAxis);

    d3.selectAll('.axis>.tick>text')
      .each(function(): void {
        d3.select(this).style('font-size', axisFontSize);
      });

    const yMax = d3.max(this.dataSet, d => d.value);
    const transition = (duration) => {
      this.y.domain([0, yMax]);
      rect.transition()
        .duration(duration)
        .delay((d, i) => i * 40)
        .attr('y', d => this.y(d.value))
        .attr('height', d => this.y(0) - this.y(d.value));
    };

    if (this.settingsService.settings.animatedGraphs) {
      transition(600);
    } else {
      rect.attr('y', d => this.y(d.value))
          .attr('height', d => this.y(0) - this.y(d.value));
    }
  }


}

