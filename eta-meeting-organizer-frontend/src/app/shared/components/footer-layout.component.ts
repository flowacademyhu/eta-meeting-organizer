import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [`
background-size: contain;
  }
  .top-arrow {
    margin-bottom: 40px;
    img {
      width: 36px;
      margin: 0 auto;
    }
  }
  .flw {
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    padding: 8px;
    color: white;
    font-size: 14px;
    width: 80%;
    a {
      color: white;
      &:hover {
        color: $color-darkgray-bg;
        outline: none;
        text-decoration: none;
      }
    }
  }
}

  `],
  template: `
  <footer class="foot" color="primary">
  <div class="flw"> <img src="../../../assets/footer_city.png"> </div>
  </footer>
 `
})

export class FooterComponent {
}
