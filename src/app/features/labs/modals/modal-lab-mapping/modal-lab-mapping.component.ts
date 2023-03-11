import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ILab, ILabMapping } from '../../../../core/@types/lab';
import { LabService } from '../../services/lab.service';

@Component({
  selector: 'app-modal-lab-mapping',
  templateUrl: './modal-lab-mapping.component.html',
  styleUrls: ['./modal-lab-mapping.component.css']
})
export class ModalLabMappingComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''
  name: any = ''
  f43: any = ''
  loinc: any = ''
  labDetail: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private labService: LabService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      f43: [null, [Validators.required]],
      loinc: [null, [Validators.required]],
      labDetail: [null, [Validators.required]],
    })
  }

  showModal(lab: ILab): void {

    this.validateForm.reset()
    this.code = lab.code
    this.name = lab.name

    this.labDetail = `${this.code} - ${this.name}`

    this.validateForm.patchValue({
      f43: lab.f43,
      loinc: lab.loinc,
      labDetail: this.labDetail
    })

    this.validateForm.controls['labDetail'].disable()

    this.isVisible = true
  }

  async doMapping(drug: ILabMapping) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.labService.mapping(drug)
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

  handleOk(): void {
    if (this.validateForm.valid) {
      let mapping: ILabMapping = {
        code: this.code,
        f43: this.validateForm.value.f43,
        loinc: this.validateForm.value.loinc,
      }

      this.doMapping(mapping)
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
