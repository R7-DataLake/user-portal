import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.css']
})
export class ModalSearchComponent {

  @Output() onSubmit = new EventEmitter<string>()

  isVisible = false

  query = ''

  showModal(): void {
    this.query = ''
    this.isVisible = true
  }

  handleOk(): void {
    this.onSubmit.emit(this.query)
    this.isVisible = false
  }

  handleCancel(): void {
    this.isVisible = false
  }

}
