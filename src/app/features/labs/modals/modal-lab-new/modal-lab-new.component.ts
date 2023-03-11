import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ILab, ILabCreate, ILabUpdate } from '../../../../core/@types/lab';
import { LabGroupService } from '../../../lab-groups/services/lab-group.service';
import { LabService } from '../../services/lab.service';

@Component({
  selector: 'app-modal-lab-new',
  templateUrl: './modal-lab-new.component.html',
  styleUrls: ['./modal-lab-new.component.css']
})
export class ModalLabNewComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''
  groups: any[] = []

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private labService: LabService,
    private labGroupService: LabGroupService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      labGroupCode: [null, [Validators.required]],
    })
  }

  showModal(): void {
    this.validateForm.reset()
    this.validateForm.controls['code'].enable()
    this.isVisible = true

    this.getLabGroups()
  }

  showModalUpdate(lab: ILab): void {
    this.validateForm.reset()
    this.validateForm.controls['code'].disable()
    this.code = lab.code
    this.validateForm.patchValue({
      code: lab.code,
      name: lab.name,
      labGroupCode: lab.lab_group_code,
    })
    this.isVisible = true

    this.getLabGroups()
  }

  async getLabGroups() {
    try {
      const response = await this.labGroupService.getList('', 100, 0)

      const responseData: any = response.data
      this.groups = responseData.data

    } catch (error: any) {
      this.message.error(`Lab groups: ${error.code} - ${error.message}`)
    }
  }

  async doRegister(lab: ILabCreate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.labService.save(lab)
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

  async doUpdate(lab: ILabUpdate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.labService.update(this.code, lab)
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
        let lab: ILabUpdate = {
          name: this.validateForm.value.name,
          lab_group_code: this.validateForm.value.labGroupCode,
        }

        this.doUpdate(lab)

      } else {
        let lab: ILabCreate = {
          code: this.validateForm.value.code,
          name: this.validateForm.value.name,
          lab_group_code: this.validateForm.value.labGroupCode,
        }

        this.doRegister(lab)

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
  }
}
