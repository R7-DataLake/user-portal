import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from '../../../environments/environment';
import { IDrugUsage } from '../../core/@types/drug_usage';
import { ModalSearchComponent } from '../../shared/modals/modal-search/modal-search.component';
import { ModalDrugUsageNewComponent } from './modals/modal-drug-usage-new/modal-drug-usage-new.component';
import { DrugUsageService } from './servies/drug-usage.service';

@Component({
  selector: 'app-drug-usages',
  templateUrl: './drug-usages.component.html',
  styleUrls: ['./drug-usages.component.css']
})
export class DrugUsagesComponent {

  @ViewChild('mdlSearch') private mdlSearch!: ModalSearchComponent;
  @ViewChild('mdlDrugUsagNew') private mdlDrugUsagNew!: ModalDrugUsageNewComponent;

  datasets: IDrugUsage[] = []
  query: any = ''
  uploadUrl: any = ''
  uploadHeader: any = ''

  total = 0
  pageSize = 20
  pageIndex = 1
  offset = 0
  loading = true

  constructor (
    private router: Router,
    private drugUsageService: DrugUsageService,
    private message: NzMessageService
  ) {
    const token = sessionStorage.getItem('token')
    this.uploadHeader = { authorization: 'Bearer ' + token }
    this.uploadUrl = `${environment.apiUrl}/libs/drug-usages/upload`
  }

  ngOnInit() {
    this.getDrugs()
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  onPageIndexChange(pageIndex: any) {

    this.offset = pageIndex === 1 ?
      0 : (pageIndex - 1) * this.pageSize;

    this.getDrugs()
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = pageSize
    this.pageIndex = 1

    this.offset = 0

    this.getDrugs()
  }

  onSearchSubmit(query: any) {
    if (query) {
      this.query = query
      this.getDrugs()
    }
  }

  onAddSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getDrugs()
    }
  }

  onMappingSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getDrugs()
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`)
      this.getDrugs()
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} file upload failed.`)
    }
  }

  search() {
    this.mdlSearch.showModal()
  }

  refresh() {
    this.query = ''
    this.pageIndex = 1
    this.offset = 0
    this.getDrugs()
  }

  async getDrugs() {
    this.loading = true
    try {
      const _limit = this.pageSize
      const _offset = this.offset

      const response = await this.drugUsageService.getList(this.query, _limit, _offset)

      this.loading = false

      const responseData: any = response.data
      this.total = responseData.total || 1

      this.datasets = responseData.data.map((v: any) => {
        const created_at = DateTime.fromISO(v.created_at, { zone: "Asia/Bangkok", locale: 'th' })
        const updated_at = DateTime.fromISO(v.updated_at, { zone: "Asia/Bangkok", locale: 'th' })
        v.created_at = created_at.toLocaleString(DateTime.DATETIME_SHORT)
        v.updated_at = updated_at.toLocaleString(DateTime.DATETIME_SHORT)
        return v
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  async removeDrug(code: any) {
    this.loading = true
    try {
      await this.drugUsageService.remove(code)
      this.loading = false
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getDrugs()
    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  confirmRemove(code: any) {
    if (code) {
      this.removeDrug(code)
    }
  }

  cancelRemove() { }

  addItem() {
    this.mdlDrugUsagNew.showModal()
  }

  editItem(usage: IDrugUsage) {
    this.mdlDrugUsagNew.showModalUpdate(usage)
  }

}
