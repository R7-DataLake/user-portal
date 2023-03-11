import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { INation } from '../../core/@types/nation';
import { ModalSearchComponent } from '../../shared/modals/modal-search/modal-search.component';
import { ModalNationMappingComponent } from './modals/modal-nation-mapping/modal-nation-mapping.component';
import { ModalNationNewComponent } from './modals/modal-nation-new/modal-nation-new.component';
import { NationService } from './services/nation.service';

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrls: ['./nations.component.css']
})
export class NationsComponent {

  @ViewChild('mdlSearch') private mdlSearch!: ModalSearchComponent;
  @ViewChild('mdlNationNew') private mdlNationNew!: ModalNationNewComponent;
  @ViewChild('mdlNationMapping') private mdlNationMapping!: ModalNationMappingComponent;

  datasets: INation[] = []
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
    private nationService: NationService,
    private message: NzMessageService
  ) {
    const token = sessionStorage.getItem('token')
    this.uploadHeader = { authorization: 'Bearer ' + token }
    this.uploadUrl = `${this.apiUrl}/libs/nations/upload`
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

      const response = await this.nationService.getList(this.query, _limit, _offset)

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
      await this.nationService.remove(code)
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
    this.mdlNationNew.showModal()
  }

  editItem(code: any, name: any) {
    this.mdlNationNew.showModal(code, name)
  }

  showMapping(nation: INation) {
    this.mdlNationMapping.showModal(nation)
  }

}
