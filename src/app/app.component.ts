import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  characterDetail: any
  private currentPage = 1
  isActive = false
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.listOfCharacters(this.currentPage)
  }

  public listOfCharacters(pagination: number): void {
    this.apollo
      .watchQuery({
        query: gql`
        query GetCharacters($pagination: Int!) {
          characters(page: $pagination) {
            results {
              id
              name
              image
            }
          }
        }
      `, variables: {
          pagination: pagination
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result.data?.characters.results;
      });
  }

  public nextPage(): void {
    this.currentPage++
    this.listOfCharacters(this.currentPage)
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.listOfCharacters(this.currentPage)
    }
  }

  fetchDetails(id: string): void {
    // Not implemented
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //     query {
    //       character {
    //         results(id : $id) {
    //           gender
    //         }
    //       }
    //     }
    //   `, variables: {
    //       id: id
    //     }
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     this.characterDetail = result.data?.characters.results;
    //   });
  }
}

