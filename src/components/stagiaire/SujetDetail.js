import React from "react";
import StagiaireLayout from "../../layouts/stagiaire/StagiaireLayout";
import { Link } from "react-router-dom";
import "../stagiaire/SujetDetail";
import axios from "axios";
import swal from "sweetalert";
import TopAdmin from "../../assets/Home/assets/img/TopAdmin.png";

class SujetDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: "",
      domaine: "",
      description: "",
      type: "",
      technologies: "",
      periode: "",
      date: "",
      encadrant_name: "",
      error: "",
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get("id");
    axios.get(`/api/editSujet/${page_type}`).then((res) => {
      if (res.data.status === 200) {
        this.setState({
          titre: res.data.sujet.titre,
          domaine: res.data.sujet.domaine,
          description: res.data.sujet.description,
          type: res.data.sujet.type,
          technologies: res.data.sujet.technologies,
          periode: res.data.sujet.periode,
          date: res.data.sujet.date,
          encadrant_name: res.data.sujet.encadrant_name,
        });
      } else if (res.data.status === 404) {
        swal("error", res.data.message, "error");
      }
    });
  }
  handleStatusChange() {}
  render() {
    return (
      <StagiaireLayout>
        <div class="card">
          <div class="row">
            <aside class="col-sm-5 border-right">
              <article class="gallery-wrap">
                <div class="img-big-wrap">
                  <div>
                    <img src={TopAdmin} />
                  </div>
                </div>
              </article>
            </aside>
            <aside class="col-sm-7">
              <article class="card-body p-5">
                <h3 class="title mb-3">{this.state.titre}</h3>

                <p class="price-detail-wrap">
                  <span class="price h3 text-warning">
                    <span class="currency">{this.state.type}</span>
                  </span>
                </p>

                <dl class="item-property">
                  <dt>Description</dt>
                  <dd>
                    <p>{this.state.description}</p>
                  </dd>
                </dl>
                <dl class="param param-feature">
                  <dt>Domaine</dt>
                  <dd>{this.state.domaine}</dd>
                </dl>
                <dl class="param param-feature">
                  <dt>technologies</dt>
                  <dd>{this.state.technologies}</dd>
                </dl>

                <dl class="param param-feature">
                  <dt>Encadrant</dt>
                  <dd>{this.state.encadrant_name}</dd>
                </dl>

                <hr />
                <div class="row">
                  <div class="col-sm-5">
                    <dl class="param param-inline">
                      <dt>Période</dt>
                      <dd>{this.state.periode}</dd>
                    </dl>
                  </div>

                  <div class="col-sm-7">
                    <dl class="param param-inline">
                      <dt>Date:</dt>
                      <dd>{this.state.date}</dd>
                    </dl>
                  </div>
                </div>

                <hr />
                <a href="#" class="btn btn-lg btn-primary text-uppercase">
                  Apply now
                </a>
              </article>
            </aside>
          </div>
        </div>
      </StagiaireLayout>
    );
  }
}

export default SujetDetail;
