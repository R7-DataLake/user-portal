import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { INationCreate, INationUpdate } from '../../../../core/@types/nation';
import { NationService } from '../../services/nation.service';


@Component({
  selector: 'app-modal-nation-new',
  templateUrl: './modal-nation-new.component.html',
  styleUrls: ['./modal-nation-new.component.css']
})
export class ModalNationNewComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private nationService: NationService,
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

  async doRegister(item: INationCreate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.nationService.save(item)
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

  async doUpdate(item: INationUpdate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.nationService.update(this.code, item)
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
        let item: INationUpdate = {
          name: this.validateForm.value.name
        }

        this.doUpdate(item)

      } else {
        let item: INationCreate = {
          code: this.validateForm.value.code,
          name: this.validateForm.value.name,
        }

        this.doRegister(item)

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
