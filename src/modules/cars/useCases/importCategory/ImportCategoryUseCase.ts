import fs from 'fs';
import csvParse from 'csv-parse';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';


interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // recebe o arquivo, cria a stream para leitura, e converte o csv
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();

      const categories: IImportCategory[] = [];

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({ name, description });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(category => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) this.categoriesRepository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };