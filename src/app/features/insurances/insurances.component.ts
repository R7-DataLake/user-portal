import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { IInsurance } from '../../core/@types/insurance';
import { ModalSearchComponent } from '../../shared/modals/modal-search/modal-search.component';
import { ModalInsuranceMappingComponent } from './modals/modal-insurance-mapping/modal-insurance-mapping.component';
import { ModalInsuranceNewComponent } from './modals/modal-insurance-new/modal-insurance-new.component';
import { InsuranceService } from './services/insurance.service';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent {

  @ViewChild('mdlSearch') private mdlSearch!: ModalSearchComponent;
  @ViewChild('mdlNew') private mdlNew!: ModalInsuranceNewComponent;
  @ViewChild('mdlMapping') private mdlMapping!: ModalInsuranceMappingComponent;

  datasets: IInsurance[] = []
  query: any = ''
  uploadUrl: any = ''
  uploadHeader: any = ''

  total = 0
  pageSize = 20
  pageIndex = 1
  offset = 0
  loading = true

  constructor (
    @Inject('API_URL') private apiUrl: any,
    private router: Router,
    private insuranceService: InsuranceService,
    private message: NzMessageService
  ) {
    const token = sessionStorage.getItem('token')
    this.uploadHeader = { authorization: 'Bearer ' + token }
    this.uploadUrl = `${this.apiUrl}/libs/insurances/upload`
  }

  ngOnInit() {
    this.getItems()
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  onPageIndexChange(pageIndex: any) {

    this.offset = pageIndex === 1 ?
      0 : (pageIndex - 1) * this.pageSize;

    this.getItems()
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = pageSize
    this.pageIndex = 1

    this.offset = 0

    this.getItems()
  }

  onSearchSubmit(query: any) {
    if (query) {
      this.query = query
      this.getItems()
    }
  }

  onAddSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getItems()
    }
  }

  onMappingSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getItems()
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`)
      this.getItems()
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
    this.getItems()
  }

  async getItems() {
    this.loading = true
    try {
      const _limit = this.pageSize
      const _offset = this.offset

      const response = await this.insuranceService.getList(this.query, _limit, _offset)

      this.loading = false
      const responseData: any = response.data
      this.total = responseData.total || 1

      this.datasets = responseData.data.map((v: any) => {
        const created_at = DateTime.fromISO(v.created_at, {
          zone: "Asia/Bangkok",
          locale: 'th'
        })
        const updated_at = DateTime.fromISO(v.updated_at, {
          zone: "Asia/Bangkok",
          locale: 'th'
        })
        v.created_at = created_at.toLocaleString(DateTime.DATETIME_SHORT)
        v.updated_at = updated_at.toLocaleString(DateTime.DATETIME_SHORT)
        return v
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  async remove(code: any) {
    this.loading = true
    try {
      await this.insuranceService.remove(code)
      this.loading = false
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getItems()
    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  confirmRemove(code: any) {
    if (code) {
      this.remove(code)
    }
  }

  cancelRemove() { }

  addItem() {
    this.mdlNew.showModal()
  }

  editItem(code: any, name: any) {
    this.mdlNew.showModal(code, name)
  }

  showMapping(nation: IInsurance) {
    this.mdlMapping.showModal(nation)
  }
}
