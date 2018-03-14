import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-units',
  templateUrl: './help-units.component.html',
  styleUrls: ['./help-units.component.scss']
})
export class HelpUnitsComponent implements OnInit {

  public readonly unitData = [
    new UnitData(3, "Thousand", "k", "kilo-", "1,000"),
    new UnitData(6, "Million", "M", "Mega-", "1,000,000"),
    new UnitData(9, "Billion", "G", "Giga-", "1,000,000,000"),
    new UnitData(12, "Trillion", "T", "Tera-", "1,000,000,000,000"),
    new UnitData(15, "Quadrillion", "P", "Peta-", "1,000,000,000,000,000"),
    new UnitData(18, "Quintillion", "E", "Exa-", "1,000,000,000,000,000,000"),
    new UnitData(21, "Sextillion", "Z", "Zetta-", "1,000,000,000,000,000,000,000"),
    new UnitData(24, "Septillion", "Y", "Yotta-", "1,000,000,000,000,000,000,000,000"),
    new UnitData(27, "Octillion", "kY", "kiloYotta-", ""),
    new UnitData(30, "Nonillion", "MY", "MegaYotta-", ""),
    new UnitData(33, "Decillion", "GY", "GigaYotta-", ""),
    new UnitData(36, "Undecillion", "TY", "TeraYotta-", ""),
    new UnitData(39, "Duodecillion", "PY", "PetaYotta-", "")
  ];

  constructor() { }

  ngOnInit() {
  }

}

//     <td>10<sup>6</sup></td><td>Million</td><td>M</td><td>Mega-</td><td>1,000,000</td>

class UnitData {
  constructor(
    private exponent: number,
    private name: string,
    private si: string,
    private prefix: string,
    private infull: string
  ) { }
}
