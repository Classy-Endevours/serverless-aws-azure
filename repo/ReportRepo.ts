import DatabaseModal from ".";

class ReportRepo extends DatabaseModal {
  find = (options = {}) => {
    return this.db.reports.findMany(options);
  };

  findUnique = (options = {}) => {
    return this.db.reports.findUnique(options);
  };

  update = (options = {}) => {
    return this.db.reports.update(options);
  };

  create = (options = {}) => {
    return this.db.reports.create(options);
  };
}

export default new ReportRepo();
