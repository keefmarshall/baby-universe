import { Injectable } from '@angular/core';
import { UniverseService } from './universe.service';

@Injectable()
export class BackupService {

  constructor(private universeService: UniverseService) { }

  backupUniverse(filename: string) {
    const key = this.generateKey(filename);
    console.log(`Backing up universe to ${key}`);
    localStorage.setItem(key, JSON.stringify(this.universeService.universe));
  }

  restoreUniverse(filename: string) {
    const key = this.generateKey(filename);
    const ustr = localStorage.getItem(key);
    if (ustr != null) {
      // backup current universe first!
      this.backupUniverse('restoration');
      console.log(`restoring universe from backup ${key}`);
      this.universeService.universe = JSON.parse(ustr);
      this.universeService.updateCode();
      this.universeService.saveUniverse();
      window.location.reload();
    }
  }

  private generateKey(filename: string): string {
    return `backup.${filename}`;
  }
}
