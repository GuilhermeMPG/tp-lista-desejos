import { ItensListService } from 'src/app/shared/services/itens-list.service';
import { itens_List, itens_List_back } from 'src/app/shared/models/itens_lista.model';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-dialog-change',
  templateUrl: './dialog-change.component.html',
  styleUrls: ['./dialog-change.component.scss'],
})
export class DialogChangeComponent implements OnInit, OnChanges {
  newProduct: itens_List_back = {
    nome:'produto',
    descricao: 'descriçao',
    prioridade: 10,
    preco:10,
    adquirido: false

  };
  header: string = '';

  @Input() public display!: boolean;
  @Input() public novo!: boolean;
  @Input() public editId!: number;
  @Output() public displayChange = new EventEmitter();
  @Output() public updateData = new EventEmitter();

  constructor(private itensListService: ItensListService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.novo == true) {
      this.header = 'Adicionar Item';
      this.newProduct.nome = ""
      this.newProduct.preco = 0;
      this.newProduct.descricao = "";
      this.newProduct.prioridade = 0;

    }
    if (this.novo == false) {
      this.header = 'Editar Item';
      this.itensListService.getItem(this.editId).subscribe((item) => {
        this.newProduct.nome = item.nome;
        this.newProduct.preco = item.preco;
        this.newProduct.descricao = item.descricao;
        this.newProduct.prioridade = item.prioridade;
        this.newProduct.id = item.id;
      });
    }
  }

  onSalvar() {
    if (this.novo == true) {
      this.itensListService.postIten(this.newProduct).subscribe(() => {
        this.display = false;
        this.updateData.emit();
      });
    }
    if (this.novo == false) {
      this.itensListService.update(this.newProduct).subscribe(() => {
        this.display = false;
        this.updateData.emit();
      });
    }
  }
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
