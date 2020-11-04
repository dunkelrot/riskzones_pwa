import {Component, Input, OnInit} from '@angular/core';
import {RKIService} from '../../services/rki-service';
import {ZoneHistoryRecord} from '../../model/history';
import {DateTime} from 'luxon';
import { Zone } from 'src/app/model/zones';

declare let d3: any;

class DataEntry {
  constructor(public dateTime: DateTime, public value: number, public color: string) {}
}

@Component({
  selector: 'app-zone-history',
  templateUrl: './zone-history.component.html',
  styleUrls: ['./zone-history.component.css']
})
export class ZoneHistoryComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('zone') zone: Zone;

  private svg;
  private margin = ({top: 30, right: 0, bottom: 30, left: 50});

  private width = 400;
  private height = 380;

  private x: any;
  private y: any;

  private xAxis: any;
  private yAxis: any;

  private color = 'steelblue';

  constructor(private rkiService: RKIService) { }

  ngOnInit(): void {

    const zoneHistory = this.rkiService.getHistory().getEntryById(this.zone.id);
    const data = this.buildDataSet(zoneHistory);

    this.x = d3.scaleBand()
      .domain(d3.range(7))
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    this.y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.xAxis = gx => gx
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.x).tickFormat(i => data[i].dateTime.toFormat('LLL dd')).tickSizeOuter(0));

    this.yAxis = (gy) => {
      gy.attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(this.y).ticks(4))
        .call(g => g.select('.domain').remove());
      };

    this.svg = d3.select('svg#barGraph')
      .attr('viewBox', [0, 0, this.width + this.margin.left + this.margin.right, this.height]);

    this.svg.selectAll('g').data(data)
      .join('g')
      .attr('fill', this.color)
      .append('rect')
      .attr('x', (d, i) => this.x(i))
      .attr('y', d => this.y(d.value))
      .attr('height', d => this.y(0) - this.y(d.value))
      .attr('width', this.x.bandwidth());

    this.svg.append('g')
      .attr('class', 'axis')
      .call(this.xAxis);

    this.svg.append('g')
      .attr('class', 'axis')
      .call(this.yAxis);

    d3.selectAll('.axis>.tick>text')
      .each(function(): void {
        d3.select(this).style('font-size', '1.2em');
      });
  }

  private buildDataSet(zoneHistory: ZoneHistoryRecord): Array<DataEntry> {
    const dataSet = new Array<DataEntry>();

    let date = DateTime.local().startOf('day');
    for (let ii = 0; ii < 7; ii++) {
      const dataEntry = new DataEntry(date, 0, '#ffffff');
      dataSet.push(dataEntry);

      zoneHistory.records.forEach((record) => {
        if (record.dateTime.toMillis() === date.toMillis()) {
          dataEntry.value = record.casesPer100k;
          dataEntry.color = Zone.zoneColor(record.casesPer100k);
        }
      });

      date = date.minus({days: 1});
    }

    dataSet.reverse();
    return dataSet;
  }

}
