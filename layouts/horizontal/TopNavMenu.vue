<!-- eslint-disable vue/valid-template-root -->
<template>
</template>
<script>
export default {
  data() {
    return {
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "./",
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Nouveau colis",
            iconLeft: '<i class="mdi mdi-truck"></i>',
            path: "/#nouveau-colis"
          },
          {
            type: "link",
            text: "Transport en cours",
            iconLeft: '<i class="mdi mdi-truck"></i>',
            path: "/#en-cours"
          },
          {
            type: "link",
            text: "Datatable",
            iconLeft: '<i class="mdi mdi-folder-table"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "DataIterators",
                path: { name: "dataIterators" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },
              {
                type: "link",
                text: "SimpleTables",
                path: { name: "simpleTables" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              },
              {
                type: "link",
                text: "DataTables",
                path: { name: "dataTables" },
                iconLeft: '<i class="mdi mdi-circle-medium"></i>'
              }
            ]
          },
          {
            type: "link",
            text: "Transports terminées",
            iconLeft: '<i class="mdi mdi-check"></i>',
            path: "/#terminer"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.vnb {
  &__menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }

        &:hover {
          color: #0081ff;

          .vnb__menu-options__option__arrow {
            fill: #0081ff;
          }
        }

        &__icon {
          svg {
            fill: #0081ff !important;
          }
        }
      }
    }
  }

  &__sub-menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }

        color: #000 !important;

        &:hover {
          color: #0081ff !important;
        }
      }
    }
  }
}

.vnb__collapse-button {
  &:focus {
    border: 1px solid none;
    outline: none;
  }

  &:after {
    content: "\F035C";
    font-size: 25px;
    font-weight: 600;
    font-family: "Material Design Icons";
  }

  svg {
    display: none !important;
  }
}

.vnb__popup {
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll !important;

  .vnb__popup__top__close-button {
    &:focus {
      border: 1px solid none;
      outline: none;
    }

    top: 20px;
    right: -33px;

    svg {
      fill: #000 !important;
    }
  }
}
</style>
