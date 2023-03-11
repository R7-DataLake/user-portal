import { NzMessageService } from 'ng-zorro-antd/message';

import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { IDrugCreate, IDrugUpdate } from '../../../../core/@types/drug';
import { DrugService } from '../../services/drug.service';

@Component({
  selector: 'app-modal-drug-new',
  templateUrl: './modal-drug-new.component.html',
  styleUrls: ['./modal-drug-new.component.css']
})
export class ModalDrugNewComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private drugService: DrugService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
    })
  }

  showModal(code: any = '', name: any = ''): void {

    this.validateForm.reset()
    this.validateForm.controls['code'].enable()
    this.code = null

    if (code) {
      this.code = code
      this.validateForm.patchValue({
        name: name,
        code: code
      })
      this.validateForm.controls['code'].disable()
    }

    this.isVisible = true
  }

  async doRegister(drug: IDrugCreate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.drugService.save(drug)
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

  async doUpdate(drug: IDrugUpdate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.drugService.update(this.code, drug)
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
      if (this.code) {
        let drug: IDrugUpdate = {
          name: this.validateForm.value.name
        }

        this.doUpdate(drug)

      } else {
        let drug: IDrugCreate = {
          code: this.validateForm.value.code,
          name: this.validateForm.value.name,
        }

        this.doRegister(drug)

      }
      return
    } else {
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
