import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../../services/universe.service';
import { AutosaveService } from '../../services/autosave.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private universeService: UniverseService,
    private autosaveService: AutosaveService
  ) { }

  ngOnInit() {
  }

  resetUniverse() {
    const confirm = window.confirm('This will erase all progress, are you sure?');
    if (confirm) {
      this.universeService.resetUniverse();
      this.autosaveService.autosave();
      window.location.reload();
    }
  }

}
