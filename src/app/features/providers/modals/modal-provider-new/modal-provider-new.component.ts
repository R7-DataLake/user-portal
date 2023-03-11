import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProvider, IProviderCreate, IProviderUpdate } from '../../../../core/@types/provider';
import { ProviderService } from '../../services/provider.service';

import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-modal-provider-new',
  templateUrl: './modal-provider-new.component.html',
  styleUrls: ['./modal-provider-new.component.css']
})
export class ModalProviderNewComponent {
  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''
  birth: any;
  startDate: any;
  endDate: any;

  sex = [
    { code: '1', 'name': 'ชาย' },
    { code: '2', 'name': 'หญิง' },
  ]

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private providerService: ProviderService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      cid: [null, [Validators.required]],
      prename: [null, [Validators.required]],
      birth: [null, [Validators.required]],
      provider_type: [null, [Validators.required]],
      start_date: [null, []],
      end_date: [null, []],
      register_no: [null, [Validators.required]],
      // council: [null, [Validators.required]]
    })
  }

  showModal(): void {
    this.validateForm.controls['code'].enable()
    this.validateForm.reset()
    this.isVisible = true
  }

  showModalEdit(item: IProvider): void {

    this.validateForm.reset()
    this.code = null

    if (_.has(item, 'code')) {
      this.code = item.code;
      this.validateForm.patchValue({
        code: item.code,
        cid: item.cid,
        prename: item.prename,
        fname: item.fname,
        lname: item.lname,
        sex: item.sex,
        birth: item.birth ? new Date(item.birth) : null,
        provider_type: item.provider_type,
        start_date: item.start_date ? new Date(item.start_date) : null,
        end_date: item.end_date ? new Date(item.end_date) : null,
        register_no: item.register_no,
        // council: item.council,
      })
      this.validateForm.controls['code'].disable()
    }

    this.isVisible = true
  }

  async doRegister(item: IProviderCreate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.providerService.save(item)
      this.message.remove(messageId)
      this.isOkLoading = false
      this.isVisible = false
      this.onSubmit.emit(true)
    } catch (error: any) {
      this.isOkLoading = false
      this.message.remove(messageId)
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  async doUpdate(item: IProviderUpdate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.providerService.update(this.code, item)
      this.message.remove(messageId)
      this.isOkLoading = false
      this.isVisible = false
      this.onSubmit.emit(true);
    } catch (error: any) {
      this.isOkLoading = false
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      console.table(this.validateForm.value);

      const value = this.validateForm.value;
      const birth = DateTime.fromJSDate(value.birth).toFormat('yyyyLLdd');
      const start_date = DateTime.fromJSDate(value.start_date).toFormat('yyyyLLdd');
      const end_date = DateTime.fromJSDate(value.end_date).toFormat('yyyyLLdd');

      if (this.code) {
        let item: IProviderUpdate = {
          cid: value.cid,
          fname: value.fname,
          lname: value.lname,
          prename: value.prename,
          birth: birth,
          sex: value.sex,
          provider_type: value.provider_type,
          start_date: start_date,
          end_date: end_date,
          register_no: value.register_no,
          // council: ''
        }

        this.doUpdate(item)

      } else {
        let item: IProviderCreate = {
          code: this.validateForm.value.code,
          cid: value.cid,
          fname: value.fname,
          lname: value.lname,
          prename: value.prename,
          birth: birth,
          sex: value.sex,
          provider_type: value.provider_type,
          start_date: start_date,
          end_date: end_date,
          register_no: value.register_no,
        }

        this.doRegister(item)

      }
      return
    } else {
      console.table(this.validateForm.value);
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      });
      return
    }
  }

  handleCancel(): void {
    this.validateForm.reset()
    this.isOkLoading = false
    this.code = null
    this.isVisible = false
  }

}
