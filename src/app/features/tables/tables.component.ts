import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from './services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  personQuery: any = ''
  dateServ: any = ''
  datedsc: any = ''

  personTotal = 0
  opdTotal = 0
  ipdTotal = 0

  total = 0

  personPageSize = 20
  personPageIndex = 1
  personOffset = 0

  opdPageSize = 20
  opdPageIndex = 1
  opdOffset = 0

  ipdPageSize = 20
  ipdPageIndex = 1
  ipdOffset = 0

  loading = true

  personDataset: any = [];
  opdDataset: any = [];
  ipdDataset: any = [];

  constructor (
    @Inject('API_URL') private apiUrl: any,
    private router: Router,
    private message: NzMessageService,
    private tableService: TableService,
  ) { }

  ngOnInit() {
    this.getPerson();
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  onTabChange(index: number) {
    // 0 = PERSON
    // 1 = OPD
    // 2 = IPD
    if (index == 0) {
      this.getPerson();
    } else if (index == 1) {
      this.getOpd();
    } else if (index === 2) {
      this.getIpd();
    } else {
      this.message.warning('ไม่พบเงื่อนไขการแสดงข้อมูล');
    }
  }

  onPersonPageIndexChange(pageIndex: any) {
    const offset = pageIndex === 1 ?
      0 : (pageIndex - 1) * this.personPageSize;
    this.personOffset = offset;
    this.getPerson();
  }

  onPersonPageSizeChange(pageSize: any) {
    this.personPageSize = pageSize
    this.personPageIndex = 1
    this.personOffset = 0
    this.getPerson()
  }

  async getPerson() {
    this.loading = true
    try {
      const _limit = this.personPageSize
      const _offset = this.personOffset

      const response: any = await this.tableService.getPerson(this.personQuery, _limit, _offset)

      this.loading = false
      const responseData: any = response.data
      this.personTotal = responseData.total || 0
      this.total = this.personTotal;

      const data: any = responseData.data;
      this.personDataset = data.map((v: any) => {
        v.birth = DateTime.fromISO(v.birth, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATE_SHORT);
        v.d_update = DateTime.fromISO(v.d_update, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATETIME_SHORT);

        return v;
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  searchPerson() {
    this.getPerson();
  }

  refreshPerson() {
    this.personQuery = '';
    this.getPerson();
  }

  // IPD
  onIpdPageIndexChange(pageIndex: any) {
    const offset = pageIndex === 1 ?
      0 : (pageIndex - 1) * this.ipdPageSize;
    this.ipdOffset = offset;
    this.getIpd();
  }

  onIpdPageSizeChange(pageSize: any) {
    this.ipdPageSize = pageSize
    this.ipdPageIndex = 1
    this.ipdOffset = 0
    this.getIpd()
  }

  async getIpd() {
    this.loading = true
    try {
      const _limit = this.ipdPageSize
      const _offset = this.ipdOffset
      const _datedsc = DateTime.fromJSDate(this.datedsc).toSQLDate();
      const response: any = await this.tableService.getIpd(_datedsc, _limit, _offset)

      this.loading = false
      const responseData: any = response.data
      this.ipdTotal = responseData.total || 0

      const data: any = responseData.data;
      this.ipdDataset = data.map((v: any) => {
        v.datedsc = DateTime.fromISO(v.datedsc, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATE_SHORT);
        v.dateadm = DateTime.fromISO(v.dateadm, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATE_SHORT);

        v.d_update = DateTime.fromISO(v.d_update, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATETIME_SHORT);

        return v;
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  searchIpd() {
    this.getIpd();
  }

  refreshIpd() {
    this.datedsc = '';
    this.getIpd();
  }

  // OPD
  onOpdPageIndexChange(pageIndex: any) {
    const offset = pageIndex === 1 ?
      0 : (pageIndex - 1) * this.opdPageSize;
    this.opdOffset = offset;
    this.getOpd();
  }

  onOpdPageSizeChange(pageSize: any) {
    this.opdPageSize = pageSize
    this.opdPageIndex = 1
    this.opdOffset = 0
    this.getOpd()
  }

  async getOpd() {
    this.loading = true
    try {
      const _limit = this.opdPageSize
      const _offset = this.opdOffset
      const _dateServ = DateTime.fromJSDate(this.dateServ).toSQLDate();
      const response: any = await this.tableService.getOpd(_dateServ, _limit, _offset)

      this.loading = false
      const responseData: any = response.data
      this.opdTotal = responseData.total || 0

      const data: any = responseData.data;
      this.opdDataset = data.map((v: any) => {
        v.date_serv = DateTime.fromISO(v.date_serv, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATE_SHORT);

        v.d_update = DateTime.fromISO(v.d_update, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATETIME_SHORT);

        return v;
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  searchOpd() {
    this.getOpd();
  }

  refreshOpd() {
    this.dateServ = '';
    this.getOpd();
  }

  onChangeDateServ(event: any) {
    this.getOpd();
  }

  onChangeDateDischarge(event: any) {
    this.getIpd();
  }

}
