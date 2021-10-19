import DatabaseModal from ".";

class ReportRepo extends DatabaseModal {
  find = (options = {}) => {
    return this.db.reports.findMany(options);
  };
  create = (data = {}) => {
    return this.db.reports.create({
      data,
    });
  };
}

export default new ReportRepo();
