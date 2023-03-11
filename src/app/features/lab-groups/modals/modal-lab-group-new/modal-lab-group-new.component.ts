import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ILabGroup, ILabGroupCreate, ILabGroupUpdate } from '../../../../core/@types/lab_group';
import { LabGroupService } from '../../services/lab-group.service';

@Component({
  selector: 'app-modal-lab-group-new',
  templateUrl: './modal-lab-group-new.component.html',
  styleUrls: ['./modal-lab-group-new.component.css']
})
export class ModalLabGroupNewComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private labGroupService: LabGroupService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
    })
  }

  showModal(): void {
    this.code = null
    this.validateForm.reset()
    this.validateForm.controls['code'].enable()
    this.isVisible = true
  }

  showModalUpdate(group: ILabGroup): void {

    this.validateForm.reset()
    this.validateForm.controls['code'].disable()
    this.code = group.code
    this.validateForm.patchValue({
      code: group.code,
      name: group.name
    })
    this.isVisible = true
  }

  async doRegister(drug: ILabGroupCreate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.labGroupService.save(drug)
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

  async doUpdate(drug: ILabGroupUpdate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.labGroupService.update(this.code, drug)
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
        let group: ILabGroupUpdate = {
          name: this.validateForm.value.name
        }

        this.doUpdate(group)

      } else {
        let group: ILabGroupCreate = {
          code: this.validateForm.value.code,
          name: this.validateForm.value.name
        }

        this.doRegister(group)

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
    this.isVisible = false
    this.code = null
  }

}
