import { NzMessageService } from 'ng-zorro-antd/message';

import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { IDrug, IDrugMapping } from '../../../../core/@types/drug';
import { DrugService } from '../../services/drug.service';

@Component({
  selector: 'app-modal-drug-mapping',
  templateUrl: './modal-drug-mapping.component.html',
  styleUrls: ['./modal-drug-mapping.component.css']
})
export class ModalDrugMappingComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''
  name: any = ''
  f43: any = ''
  tmt: any = ''
  drugDetail: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private drugService: DrugService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      f43: [null, [Validators.required]],
      tmt: [null, [Validators.required]],
      drugDetail: [null, [Validators.required]],
    })
  }

  showModal(drug: IDrug): void {

    this.validateForm.reset()
    this.code = drug.code
    this.name = drug.name

    this.drugDetail = `${this.code} - ${this.name}`

    this.validateForm.patchValue({
      f43: drug.f43,
      tmt: drug.tmt,
      drugDetail: this.drugDetail
    })

    this.validateForm.controls['drugDetail'].disable()

    this.isVisible = true
  }

  async doMapping(drug: IDrugMapping) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.drugService.mapping(drug)
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
      let mapping: IDrugMapping = {
        code: this.code,
        f43: this.validateForm.value.f43,
        tmt: this.validateForm.value.tmt,
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
